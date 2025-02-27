import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class WaviotService {
  private readonly host: string;
  private readonly login: string;
  private readonly password: string;
  private headers: { Authorization: string };
  private readonly logger = new Logger(WaviotService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.host = 'https://api.waviot.kz/';
    this.login = 'seilgazinov.a@waviot.kz';
    this.password = 'XDR567uio@';
    // this.host = this.configService.get<string>('WAVIOT_HOST', { infer: true });
    this.headers = { Authorization: '' };
    void this.initialize();
  }

  private async initialize() {
    try {
      const token = await this.getToken();
      this.headers = { Authorization: token };
    } catch (error) {
      this.logger.error('Error initializing service:', error);
      // Handle the error appropriately (e.g., set a default token, throw an error, etc.)
    }
  }

  private async getToken(): Promise<string> {
    const url = 'https://auth.waviot.kz/?action=user-login&true_api=1';
    const data = { login: this.login, password: this.password };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
          },
        }),
      );

      const token = response.data?.WAVIOT_JWT;
      if (!token) {
        throw new HttpException(
          'Failed to retrieve token',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return `Bearer ${token}`;
    } catch (error) {
      this.logger.error('Error while retrieving token', error);
      throw new HttpException('Authentication failed', HttpStatus.UNAUTHORIZED);
    }
  }

  private async sendGetRequest(
    url: string,
    params?: any,
    headers?: any,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, params }).pipe(
          catchError((e) => {
            throw new HttpException(
              e.message,
              e.response?.status || HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`GET request failed for URL: ${url}`, error);
      throw error;
    }
  }

  private async sendPostRequest(
    url: string,
    data?: any,
    headers?: any,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers }).pipe(
          catchError((e) => {
            throw new HttpException(
              e.message,
              e.response?.status || HttpStatus.BAD_REQUEST,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`POST request failed for URL: ${url}`, error);
      throw error;
    }
  }

  async getStatistics(): Promise<any> {
    const url = `${this.host}telecom/api/stats`;
    try {
      return await this.sendGetRequest(url, null, this.headers);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while getting statistics',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCounterIds(params?: any): Promise<any> {
    const url = `${this.host}api/app_ids`;
    try {
      return await this.sendGetRequest(url, params, this.headers);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while getting modems',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCounterInfo(modemId: string): Promise<any> {
    const url = `${this.host}api/device`;
    try {
      return await this.sendGetRequest(
        url,
        { modem_id: modemId },
        this.headers,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while getting modem info',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCounterEvents(modemId: string): Promise<any> {
    const url = `${this.host}api/driver_electro5/report/events`;
    try {
      return await this.sendPostRequest(url, { modem: modemId }, this.headers);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while getting modem events',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEavFormatData(params?: any): Promise<any> {
    const url = `${this.host}api/eav`;
    const defaultParams = {
      type: 'extract',
      obis_code: 'value,liter_forw,0100010801FF',
      first_and_last: false,
      ...params,
    };

    this.logger.log(
      `Requesting EAV data from ${url} with params: ${JSON.stringify(defaultParams)}`,
    );

    try {
      const data = await this.sendGetRequest(url, defaultParams, this.headers);
      const modemId = params?.modem_id;
      const modemData = data[modemId] || [];

      // Assuming you have a serializer logic here
      // You can implement validation logic similar to Django serializers
      return modemData;
    } catch (error) {
      this.logger.error(`Error while requesting EAV data: ${error}`);
      throw new HttpException(
        'Error while getting EAV data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getDeviceMetadata(params?: any): Promise<any> {
    const url = `${this.host}api/metadata`;
    try {
      return await this.sendGetRequest(url, params, this.headers);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while getting device metadata',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static async checkModemExists(
    modemId: string,
    configService: ConfigService,
    httpService: HttpService,
  ): Promise<boolean> {
    const host = configService.get<string>('WAVIOT_HOST', { infer: true });
    const url = `${host}api/metadata?modem_id=${modemId}&app_id=lk`;

    try {
      const response = await firstValueFrom(httpService.get(url));
      return !!response.data[modemId];
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
