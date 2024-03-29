/**
 * 美数每日收币 v0.13
 * const $ = new Env("美数每日收币");
 * cron 10 9,20 * * *  美数.js
 * ========= 青龙--配置文件 ===========
 * # 增加定义自己的手机UA，避免黑号
 * export meishu_account_and_pwd='账号@密码@协议头User-Agent'
 * 多账号换行或&隔开

 * 奖励：每天自动收币，这个币可提现到钱包，shib，交易所 有数据,可交易；注册链接：https://mlc.yishanhonghai.com/reg.php?referrer_id=230671
 * 1积分 = 1shib（柴犬币），需要手动提现（提示：提到钱包请看清楚它软件上写的地址，按app提示来，地址不对提不到）
 * 
 * ====================================
 *   
 */

const _0xdf0505 = new _0x383137("美数每日收币");
let _0x13c1b8 = "meishu_account_and_pwd",
  _0xe9214c = ["\n", "&"],
  _0x32b474 = (_0xdf0505.isNode() ? process.env[_0x13c1b8] : _0xdf0505.getdata(_0x13c1b8)) || "",
  _0x503ca0 = [],
  _0x37d2f4 = 0,
  _0x15768a = ["1", 1, "true"]?.["includes"](_0xdf0505.isNode() ? process.env.meish_disabled_ad_power : _0xdf0505.getdata("meish_disabled_ad_power")) || true,
  _0x7c3c60 = "application/x-www-form-urlencoded",
  _0x15bad9 = "Mozilla/5.0 (Linux; Android 14; Mi 11 Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 uni-app Html5Plus/1.0 (Immersed/32.727272)";
const _0x4bdb67 = require("crypto");
function _0x42f3ff(_0x520098) {
  const _0x10b649 = _0x4bdb67.createHash("md5");
  return _0x10b649.update(_0x520098), _0x10b649.digest("hex");
}
class _0x352dcd {
  constructor(_0x139840, _0x32df0d, _0x33a773) {
    this.index = ++_0x37d2f4;
    this.points = 0;
    this.valid = false;
    this.account = _0x139840;
    this.password = _0x32df0d;
    this.accountUa = _0x33a773 || _0x15bad9;
    this.activedAuthToken = "";
    this.taskList = {
      "Comment": 0,
      "ReceivePoints": 0,
      "Like": 0,
      "Share": 0
    };
  }
  async ["taskApi"](_0x5d5bcc, _0x450c40, _0x244247, _0x51a387) {
    let _0x3fda40 = null;
    try {
      let _0x29d47d = _0x244247.replace("//", "/").split("/")[1],
        _0xbbcbc4 = {
          "url": _0x244247,
          "headers": {
            "Host": _0x29d47d,
            "Connection": "keep-alive",
            "User-Agent": this.accountUa || _0x15bad9,
            "Content-Type": _0x7c3c60,
            "Content-Length": _0x51a387?.["length"],
            "Connection": "Keep-Alive",
            "token": this.activedAuthToken || ""
          },
          "timeout": 60000
        };
      if (_0x51a387) {
        _0xbbcbc4.body = _0x51a387;
      }
      await _0x25a29d(_0x450c40, _0xbbcbc4).then(async _0x102240 => {
        if (_0x102240.resp?.["statusCode"] == 200) {
          if (_0x102240.resp?.["body"]) {
            _0x3fda40 = JSON.parse(_0x102240.resp.body);
          } else {
            console.log("账号[" + this.index + "]调用" + _0x450c40 + "[" + _0x5d5bcc + "]出错，返回为空");
          }
        } else console.log("账号[" + this.index + "]调用" + _0x450c40 + "[" + _0x5d5bcc + "]出错，返回状态码[" + (_0x102240.resp?.["statusCode"] || "") + "]");
      });
    } catch (_0x221e38) {
      console.log(_0x221e38);
    } finally {
      return Promise.resolve(_0x3fda40);
    }
  }
  async ["GetPoints"]() {
    try {
      let _0x5dc6ea = "GetPoints",
        _0x472898 = "post",
        _0x11ae47 = "https://mlc.yishanhonghai.com/interfaces/Power/index",
        _0x46da20 = "";
      return await this.taskApi(_0x5dc6ea, _0x472898, _0x11ae47, _0x46da20).then(async _0x3ebeea => {
        if (_0x3ebeea.code === 200) {
          const _0x538ee8 = _0x3ebeea.data.output_record;
          return console.log("获取可收取币列表: " + _0x538ee8.total + " 个"), _0x538ee8;
        } else _0xdf0505.logAndNotify("账号[" + this.index + "]查询可收取币失败，可能没产生哦");
      });
    } catch (_0x520078) {
      console.log(_0x520078);
    }
  }
  async ["LoginIn"]() {
    try {
      let _0xa96bd3 = "LoginIn",
        _0x2af1b8 = "post",
        _0x359e5f = "https://mlc.yishanhonghai.com/interfaces/Auth/applet_login_app",
        _0x1209ce = "login_phone=" + this.account + "&login_pw=" + _0x42f3ff(this.password);
      await this.taskApi(_0xa96bd3, _0x2af1b8, _0x359e5f, _0x1209ce).then(async _0x23879e => {
        _0x23879e.code === 200 ? (this.valid = true, this.activedAuthToken = _0x23879e.token, this.accountId = _0x23879e?.["uid"], _0xdf0505.logAndNotify("账号[" + this.index + "]登录成功，用户ID是：" + _0x23879e?.["uid"])) : _0xdf0505.logAndNotify("账号[" + this.index + "]登录失败，可能帐号无效，请检查账号密码");
      });
    } catch (_0x3f7fd5) {
      console.log(_0x3f7fd5);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["ReceivePoints"](_0xf3533a) {
    try {
      let _0xe703d8 = "ReceivePoints",
        _0x5d51b9 = "post",
        _0x3cbadd = "https://mlc.yishanhonghai.com/interfaces/Power/receive_ml",
        _0xa7603e = "ids=" + _0xf3533a?.["map"](_0x3c121c => _0x3c121c?.["id"])?.["join"](",");
      await this.taskApi(_0xe703d8, _0x5d51b9, _0x3cbadd, _0xa7603e).then(async _0x3c8fd7 => {
        _0x3c8fd7.code === 200 ? (this.taskList.ReceivePoints++, console.log("收取成功")) : console.log("收取失败！");
      });
    } catch (_0x1813eb) {
      console.log(_0x1813eb);
    } finally {
      return Promise.resolve(1);
    }
  }
  async ["PlayAd"]() {
    try {
      let _0x81a6dc = "PlayAd",
        _0x2b9182 = "post",
        _0x2c76f9 = "https://mlc.yishanhonghai.com/interfaces/Mine/advert_pre",
        _0x476293 = "";
      return await this.taskApi(_0x81a6dc, _0x2b9182, _0x2c76f9, _0x476293).then(async _0x4b06a7 => {
        if (_0x4b06a7.code === 200) {
          return console.log("拉取广告数据成功", _0x4b06a7), _0x4b06a7?.["data"];
        } else {
          return console.log("拉取广告数据失败：：" + JSON.stringify(_0x4b06a7)), false;
        }
      });
    } catch (_0x3024a5) {
      console.log(_0x3024a5);
    }
  }
  async ["Advert"](_0x1a76c5) {
    try {
      let _0x5da9af = "Advert",
        _0x6c0a28 = "post",
        _0x245dd2 = "https://mlc.yishanhonghai.com/interfaces/Mine/advert",
        _0x551ce8 = "user_id=" + this.accountId + "&pre_sign=" + _0x1a76c5;
      return await this.taskApi(_0x5da9af, _0x6c0a28, _0x245dd2, _0x551ce8).then(async _0x4914bb => {
        if (_0x4914bb.code === 200) {
          return this.taskList.ReceivePoints++, console.log("获得广告奖励成功：" + JSON.stringify(_0x4914bb)), true;
        } else return console.log("获得广告奖励失败！"), false;
      });
    } catch (_0x182b3b) {
      console.log(_0x182b3b);
    }
  }
  async ["doTask"]() {
    try {
      console.log("\n============= 账号[" + this.index + "] 开始登录=============");
      await this.LoginIn();
    } catch (_0x4704d2) {
      console.log(_0x4704d2);
    }
    let _0x435762;
    if (!_0x15768a) for (let _0x387b7c = 0; _0x387b7c < 20; _0x387b7c++) {
      await this.GetPoints();
      await _0x175a02(Math.floor(Math.random() * 1000));
      _0x435762 = await this.PlayAd();
      if (!_0x435762) {
        console.log("\n============= 账号[" + this.index + "] 获取广告收益结束=============");
        break;
      }
      console.log("\n============= 账号[" + this.index + "] 播放广告中=============");
      await _0x175a02(Math.floor(Math.random() * 5000) + 18000);
      await this.GetPoints();
      await _0x175a02(Math.floor(Math.random() * 1000));
      await this.Advert(_0x435762);
    }
    try {
      console.log("\n============= 账号[" + this.index + "] 获取可收币列表=============");
      const _0x33b62d = await this.GetPoints();
      if (!_0x33b62d?.["total"]) {
        console.log("\n============= 账号[" + this.index + "] 无可收取币=============");
        return;
      }
      await _0x175a02(Math.floor(Math.random() * 5000) + 3000);
      await this.ReceivePoints(_0x33b62d?.["list"]);
    } catch (_0x47c154) {
      console.log(_0x47c154);
    }
  }
}
!(async () => {
  if (typeof $request !== "undefined") await _0x716f3b();else {
    if (!(await _0x1b46df())) return;
    console.log("\n================ 开始执行 ================");
    console.log("\n================ 任务队列构建完毕 ================");
    for (let _0x40c77e of _0x503ca0) {
      console.log("----------- 账号[" + _0x40c77e.index + "] -----------");
      await _0x40c77e.doTask();
    }
  }
})().catch(_0x58868d => console.log(_0x58868d)).finally(() => _0xdf0505.done());
async function _0x175a02(_0xfce786 = 3000) {
  return console.log("----------- 延迟 " + _0xfce786 / 1000 + " s，请稍等 -----------"), await new Promise(_0x5a1536 => setTimeout(_0x5a1536, _0xfce786));
}
async function _0x716f3b() {}
async function _0x1b46df() {
  if (_0x32b474) {
    let _0x536489 = _0xe9214c[0];
    for (let _0x3c542c of _0xe9214c) {
      if (_0x32b474.indexOf(_0x3c542c) > -1) {
        _0x536489 = _0x3c542c;
        break;
      }
    }
    for (let _0x25d340 of _0x32b474.split(_0x536489)) {
      if (_0x25d340) {
        _0x25d340?.["split"]("@")?.["length"] === 2 ? _0x503ca0.push(new _0x352dcd(_0x25d340?.["split"]("@")[0], _0x25d340?.["split"]("@")[1])) : _0x503ca0.push(new _0x352dcd(_0x25d340?.["split"]("@")[0], _0x25d340?.["split"]("@")[1], _0x25d340?.["split"]("@")[2]));
      }
    }
    userCount = _0x503ca0.length;
  } else {
    console.log("未找到 配置信息，请检查是否配置 变量：", _0x13c1b8);
    return;
  }
  return console.log("共找到" + userCount + "个账号"), true;
}
async function _0x25a29d(_0x5ca728, _0x242b9b) {
  return httpErr = null, httpReq = null, httpResp = null, new Promise(_0x3bf969 => {
    _0xdf0505.send(_0x5ca728, _0x242b9b, async (_0x489f85, _0x38086b, _0x26ac29) => {
      httpErr = _0x489f85;
      httpReq = _0x38086b;
      httpResp = _0x26ac29;
      _0x3bf969({
        "err": _0x489f85,
        "req": _0x38086b,
        "resp": _0x26ac29
      });
    });
  });
}
function _0x383137(_0x121968, _0xff31d4) {
  return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
    constructor(_0x346f3a, _0x510833) {
      this.name = _0x346f3a;
      this.notifyStr = "";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x510833);
      console.log(this.name + " 开始运行：\n");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["getdata"](_0x353b59) {
      let _0x5943e1 = this.getval(_0x353b59);
      if (/^@/.test(_0x353b59)) {
        const [, _0x106722, _0x213b76] = /^@(.*?)\.(.*?)$/.exec(_0x353b59),
          _0x27014c = _0x106722 ? this.getval(_0x106722) : "";
        if (_0x27014c) try {
          const _0x547e2c = JSON.parse(_0x27014c);
          _0x5943e1 = _0x547e2c ? this.lodash_get(_0x547e2c, _0x213b76, "") : _0x5943e1;
        } catch (_0x2d538d) {
          _0x5943e1 = "";
        }
      }
      return _0x5943e1;
    }
    ["setdata"](_0x18e389, _0x170428) {
      let _0x39c28c = false;
      if (/^@/.test(_0x170428)) {
        const [, _0x5c9b7d, _0x2c3179] = /^@(.*?)\.(.*?)$/.exec(_0x170428),
          _0x23c70d = this.getval(_0x5c9b7d),
          _0x351bf1 = _0x5c9b7d ? "null" === _0x23c70d ? null : _0x23c70d || "{}" : "{}";
        try {
          const _0x3b9cbf = JSON.parse(_0x351bf1);
          this.lodash_set(_0x3b9cbf, _0x2c3179, _0x18e389);
          _0x39c28c = this.setval(JSON.stringify(_0x3b9cbf), _0x5c9b7d);
        } catch (_0x302dce) {
          const _0x6494ff = {};
          this.lodash_set(_0x6494ff, _0x2c3179, _0x18e389);
          _0x39c28c = this.setval(JSON.stringify(_0x6494ff), _0x5c9b7d);
        }
      } else {
        _0x39c28c = this.setval(_0x18e389, _0x170428);
      }
      return _0x39c28c;
    }
    ["getval"](_0x539201) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x539201) : this.isQuanX() ? $prefs.valueForKey(_0x539201) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x539201]) : this.data && this.data[_0x539201] || null;
    }
    ["setval"](_0x573632, _0x235fd7) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x573632, _0x235fd7) : this.isQuanX() ? $prefs.setValueForKey(_0x573632, _0x235fd7) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x235fd7] = _0x573632, this.writedata(), !0) : this.data && this.data[_0x235fd7] || null;
    }
    ["send"](_0x50f4e9, _0x343007, _0x567214 = () => {}) {
      if (_0x50f4e9 != "get" && _0x50f4e9 != "post" && _0x50f4e9 != "put" && _0x50f4e9 != "delete") {
        console.log("无效的http方法：" + _0x50f4e9);
        return;
      }
      if (_0x50f4e9 == "get" && _0x343007.headers) delete _0x343007.headers["Content-Type"], delete _0x343007.headers["Content-Length"];else {
        if (_0x343007.body && _0x343007.headers) {
          if (!_0x343007.headers["Content-Type"]) _0x343007.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
      }
      if (this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x343007.headers = _0x343007.headers || {}, Object.assign(_0x343007.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        let _0x20cace = {
          "method": _0x50f4e9,
          "url": _0x343007.url,
          "headers": _0x343007.headers,
          "timeout": _0x343007.timeout,
          "data": _0x343007.body
        };
        if (_0x50f4e9 == "get") delete _0x20cace.data;
        $axios(_0x20cace).then(_0x8ff330 => {
          const {
            status: _0x372e60,
            request: _0x7a6d1c,
            headers: _0x3d0b92,
            data: _0x169351
          } = _0x8ff330;
          _0x567214(null, _0x7a6d1c, {
            "statusCode": _0x372e60,
            "headers": _0x3d0b92,
            "body": _0x169351
          });
        }).catch(_0x3e505e => console.log(_0x3e505e));
      } else {
        if (this.isQuanX()) _0x343007.method = _0x50f4e9.toUpperCase(), this.isNeedRewrite && (_0x343007.opts = _0x343007.opts || {}, Object.assign(_0x343007.opts, {
          "hints": !1
        })), $task.fetch(_0x343007).then(_0x58f8ba => {
          const {
            statusCode: _0x4cfefa,
            request: _0x9f9bc,
            headers: _0x3cc8aa,
            body: _0x4f1817
          } = _0x58f8ba;
          _0x567214(null, _0x9f9bc, {
            "statusCode": _0x4cfefa,
            "headers": _0x3cc8aa,
            "body": _0x4f1817
          });
        }, _0x599470 => _0x567214(_0x599470));else {
          if (this.isNode()) {
            this.got = this.got ? this.got : require("got");
            const {
              url: _0x287d75,
              ..._0x112400
            } = _0x343007;
            this.instance = this.got.extend({
              "followRedirect": false
            });
            this.instance[_0x50f4e9](_0x287d75, _0x112400).then(_0x515b0c => {
              const {
                statusCode: _0xf50311,
                request: _0x14de84,
                headers: _0x523970,
                body: _0x3fb068
              } = _0x515b0c;
              _0x567214(null, _0x14de84, {
                "statusCode": _0xf50311,
                "headers": _0x523970,
                "body": _0x3fb068
              });
            }, _0x215d87 => {
              const {
                message: _0xbc44e5,
                request: _0xcc3062,
                response: _0x440bbf
              } = _0x215d87;
              _0x567214(_0xbc44e5, _0xcc3062, _0x440bbf);
            });
          }
        }
      }
    }
    ["time"](_0x20835a, _0x31aa42 = null) {
      let _0x5729bf = _0x31aa42 ? new Date(_0x31aa42) : new Date(),
        _0x11fa4c = {
          "M+": _0x5729bf.getMonth() + 1,
          "d+": _0x5729bf.getDate(),
          "h+": _0x5729bf.getHours(),
          "m+": _0x5729bf.getMinutes(),
          "s+": _0x5729bf.getSeconds(),
          "q+": Math.floor((_0x5729bf.getMonth() + 3) / 3),
          "S": _0x5729bf.getMilliseconds()
        };
      /(y+)/.test(_0x20835a) && (_0x20835a = _0x20835a.replace(RegExp.$1, (_0x5729bf.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x5ceb1a in _0x11fa4c) new RegExp("(" + _0x5ceb1a + ")").test(_0x20835a) && (_0x20835a = _0x20835a.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x11fa4c[_0x5ceb1a] : ("00" + _0x11fa4c[_0x5ceb1a]).substr(("" + _0x11fa4c[_0x5ceb1a]).length)));
      return _0x20835a;
    }
    async ["showmsg"]() {
      if (!this.notifyStr) return;
      let _0x506e62 = this.name + " 运行通知\n\n" + this.notifyStr;
      if (_0xdf0505.isNode()) {
        var _0x255551 = require("./sendNotify");
        console.log("\n============== 推送 ==============");
        await _0x255551.sendNotify(this.name, _0x506e62);
      } else this.msg(_0x506e62);
    }
    ["logAndNotify"](_0x463976) {
      console.log(_0x463976);
      this.notifyStr += _0x463976;
      this.notifyStr += "\n";
    }
    ["logAndNotifyWithTime"](_0x58e17) {
      let _0x556977 = "[" + this.time("hh:mm:ss.S") + "]" + _0x58e17;
      console.log(_0x556977);
      this.notifyStr += _0x556977;
      this.notifyStr += "\n";
    }
    ["logWithTime"](_0x2bd1e5) {
      console.log("[" + this.time("hh:mm:ss.S") + "]" + _0x2bd1e5);
    }
    ["msg"](_0x491508 = t, _0xd5360 = "", _0x182e70 = "", _0x57aaea) {
      const _0x4649e1 = _0x152382 => {
        if (!_0x152382) return _0x152382;
        if ("string" == typeof _0x152382) return this.isLoon() ? _0x152382 : this.isQuanX() ? {
          "open-url": _0x152382
        } : this.isSurge() ? {
          "url": _0x152382
        } : void 0;
        if ("object" == typeof _0x152382) {
          if (this.isLoon()) {
            let _0x11d6ad = _0x152382.openUrl || _0x152382.url || _0x152382["open-url"],
              _0x4be9d0 = _0x152382.mediaUrl || _0x152382["media-url"];
            return {
              "openUrl": _0x11d6ad,
              "mediaUrl": _0x4be9d0
            };
          }
          if (this.isQuanX()) {
            let _0x3e81e7 = _0x152382["open-url"] || _0x152382.url || _0x152382.openUrl,
              _0x47a778 = _0x152382["media-url"] || _0x152382.mediaUrl;
            return {
              "open-url": _0x3e81e7,
              "media-url": _0x47a778
            };
          }
          if (this.isSurge()) {
            let _0x13967b = _0x152382.url || _0x152382.openUrl || _0x152382["open-url"];
            return {
              "url": _0x13967b
            };
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x491508, _0xd5360, _0x182e70, _0x4649e1(_0x57aaea)) : this.isQuanX() && $notify(_0x491508, _0xd5360, _0x182e70, _0x4649e1(_0x57aaea)));
      let _0x57f4a6 = ["", "============== 系统通知 =============="];
      _0x57f4a6.push(_0x491508);
      _0xd5360 && _0x57f4a6.push(_0xd5360);
      _0x182e70 && _0x57f4a6.push(_0x182e70);
      console.log(_0x57f4a6.join("\n"));
    }
    ["getMin"](_0x123b63, _0x371f71) {
      return _0x123b63 < _0x371f71 ? _0x123b63 : _0x371f71;
    }
    ["getMax"](_0x4be51f, _0x22f812) {
      return _0x4be51f < _0x22f812 ? _0x22f812 : _0x4be51f;
    }
    ["padStr"](_0x458e84, _0x5f4d0c, _0x223fed = "0") {
      let _0x54decb = String(_0x458e84),
        _0xa78686 = _0x5f4d0c > _0x54decb.length ? _0x5f4d0c - _0x54decb.length : 0,
        _0x578fe6 = "";
      for (let _0x372e36 = 0; _0x372e36 < _0xa78686; _0x372e36++) {
        _0x578fe6 += _0x223fed;
      }
      return _0x578fe6 += _0x54decb, _0x578fe6;
    }
    ["json2str"](_0x160c70, _0x4d03f9, _0x2b0165 = false) {
      let _0xfa3159 = [];
      for (let _0x27f665 of Object.keys(_0x160c70).sort()) {
        let _0x5b4cd8 = _0x160c70[_0x27f665];
        if (_0x5b4cd8 && _0x2b0165) _0x5b4cd8 = encodeURIComponent(_0x5b4cd8);
        _0xfa3159.push(_0x27f665 + "=" + _0x5b4cd8);
      }
      return _0xfa3159.join(_0x4d03f9);
    }
    ["str2json"](_0x3eff89, _0x50277d = false) {
      let _0x4519e9 = {};
      for (let _0x353072 of _0x3eff89.split("&")) {
        if (!_0x353072) continue;
        let _0x5d77c4 = _0x353072.indexOf("=");
        if (_0x5d77c4 == -1) continue;
        let _0x5609ea = _0x353072.substr(0, _0x5d77c4),
          _0x59b8f0 = _0x353072.substr(_0x5d77c4 + 1);
        if (_0x50277d) _0x59b8f0 = decodeURIComponent(_0x59b8f0);
        _0x4519e9[_0x5609ea] = _0x59b8f0;
      }
      return _0x4519e9;
    }
    ["randomString"](_0x193587, _0x1c3253 = "abcdef0123456789") {
      let _0x7d7e07 = "";
      for (let _0x1c2c3a = 0; _0x1c2c3a < _0x193587; _0x1c2c3a++) {
        _0x7d7e07 += _0x1c3253.charAt(Math.floor(Math.random() * _0x1c3253.length));
      }
      return _0x7d7e07;
    }
    ["randomList"](_0x3de7fc) {
      let _0x56e55b = Math.floor(Math.random() * _0x3de7fc.length);
      return _0x3de7fc[_0x56e55b];
    }
    ["wait"](_0x47dc24) {
      return new Promise(_0x3947fd => setTimeout(_0x3947fd, _0x47dc24));
    }
    ["done"](_0x27aa6d = {}) {
      const _0x2d48da = new Date().getTime(),
        _0x465e6c = (_0x2d48da - this.startTime) / 1000;
      console.log("\n" + this.name + " 运行结束，共运行了 " + _0x465e6c + " 秒！");
      if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(_0x27aa6d);
    }
  }(_0x121968, _0xff31d4);
}