import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PublicDataService {
    private readonly logger = new Logger(PublicDataService.name);

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    async getBrTitleInfo(sigunguCd: string, bjdongCd: string, bun: string, ji: string) {

        try {

            const result = this.httpService.get(`http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?${this.getQueryString(sigunguCd, bjdongCd, bun, ji)}`);

            this.logger.log(`[data.go.kr] - complete getBrTitleInfo api : ${result}`);
        }
        catch (error) {
            this.logger.error(`[data.go.kr] getBrTitleInfo - ${error.message}`);
        }
    }

    async getBrExposPubuseAreaInfo(sigunguCd: string, bjdongCd: string, bun: string, ji: string) {

        try {

            const result = this.httpService.get(`http://apis.data.go.kr/1613000/BldRgstService_v2/getBrExposPubuseAreaInfo?${this.getQueryString(sigunguCd, bjdongCd, bun, ji)}`);

            this.logger.log(`[data.go.kr] - complete getBrExposPubuseAreaInfo api : ${result}`);
        }
        catch (error) {
            this.logger.error(`[data.go.kr] getBrExposPubuseAreaInfo - ${error.message}`);
        }
    }

    getQueryString(sigunguCd: string, bjdongCd: string, bun: string, ji: string): string {
        return `sigunguCd=${sigunguCd}&bjdongCd=${bjdongCd}&bun=${bun}&ji=${ji}&ServiceKey=${process.env.DATA_GO_KR_SERVICE_KEY}&numOfRows=1000`;
    }
}