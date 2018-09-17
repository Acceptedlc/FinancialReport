import * as express from "express";
import {DaoHelper} from "../dao";
import {getConfigByArgv, HttpUtil, StatisticsUtis} from "../utils";
import {HttpResponseType} from "../utils/http-util";
import {FreeCashFlow, FreeCashFlowService} from "../service/free-cash-flow-service";


const defaultConf: any = {
  db: {
    path: "/Users/lichao/financial_report.sqlite"
  },
  port: 3000
};
const config: any = getConfigByArgv(defaultConf);


const app = express();


const router: express.Router = express.Router();

router.get("/free-cash-flow-table", async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  let {corporationId, quarter, startYear, endYear} = req.query;
  console.log(req.query);
  quarter = parseInt(quarter);
  startYear = parseInt(startYear);
  endYear = parseInt(endYear);
  let items: FreeCashFlow[] = await FreeCashFlowService.caculate(corporationId, quarter, startYear, endYear);
  let freeCashMeanValue: number = StatisticsUtis.mean(items.map((e: FreeCashFlow) => e.value));
  let freeCashMedianValue: number = StatisticsUtis.median(items.map((e: FreeCashFlow) => e.value));
  let freeCashMeanRate: number = StatisticsUtis.mean(items.map((e: FreeCashFlow) => e.rate));
  let freeCashMedianRate: number = StatisticsUtis.median(items.map((e: FreeCashFlow) => e.rate));
  console.log(freeCashMedianRate)
  HttpUtil.handleSuccess(req, res, next, {
    type: HttpResponseType.json,
    data: {
      items, freeCashMeanValue, freeCashMedianValue, freeCashMeanRate, freeCashMedianRate
    }
  });
});


app.use(express.json({limit: '5mb'}));
app.use("/api/v1", router);

DaoHelper.InitConnection({
  type: "sqlite",
  database: config.db.path
}).then(() => {
  app.listen(config.port);
  console.log("listen", config.port);
}).catch(e => console.log(e.stack));



