import { BadRequestException, HttpService,Injectable, InternalServerErrorException, Logger } from "@nestjs/common";

@Injectable()
export class PublicDataService {
    private readonly logger = new Logger(PublicDataService.name);

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    async getBrTitleInfo(sigunguCd: string, bjdongCd: string, bun: string, ji: string) {

        try {

            const result = await this.httpService.get(`http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?${this.getQueryString(sigunguCd, bjdongCd, bun, ji)}`).toPromise();
            const data = result.data;

            if (data.response.header.resultCode != '00') {
                this.logger.warn(`[data.go.kr] - complete getBrTitleInfo api : ${JSON.stringify(data)}`);
                throw new BadRequestException('[data.go.kr] - Invalidate result header value');
            }

            this.logger.log(`[data.go.kr] - complete getBrTitleInfo api : ${JSON.stringify(data)}`);

            return data.response.body;
        }
        catch (error) {
            this.logger.error(`[data.go.kr] getBrTitleInfo - ${error.message}`);
            throw error;
        }
    }

    async getBrExposPubuseAreaInfo(sigunguCd: string, bjdongCd: string, bun: string, ji: string) {

        try {

            const result = await this.httpService.get(`http://apis.data.go.kr/1613000/BldRgstService_v2/getBrExposPubuseAreaInfo?${this.getQueryString(sigunguCd, bjdongCd, bun, ji)}`).toPromise();
            const data = result.data;

            if (data.response.header.resultCode != '00') {
                this.logger.warn(`[data.go.kr] - complete getBrExposPubuseAreaInfo api : ${JSON.stringify(data)}`);
                throw new BadRequestException('[data.go.kr] - Invalidate result header value');
            }

            this.logger.log(`[data.go.kr] - complete getBrExposPubuseAreaInfo api : ${JSON.stringify(data)}`);

            return data.response.body;
        }
        catch (error) {
            this.logger.error(`[data.go.kr] getBrExposPubuseAreaInfo - ${error.message}`);
            throw error;
        }
    }

    getQueryString(sigunguCd: string, bjdongCd: string, bun: string, ji: string): string {
        return `sigunguCd=${sigunguCd}&bjdongCd=${bjdongCd}&bun=${bun}&ji=${ji}&ServiceKey=${process.env.DATA_GO_KR_SERVICE_KEY}&numOfRows=1000`;
    }
}