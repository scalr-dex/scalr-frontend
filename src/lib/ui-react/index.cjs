"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const ui = require("@tonconnect/ui");
function isClientSide() {
  return typeof window !== "undefined";
}
function isServerSide() {
  return !isClientSide();
}
const TonConnectUIContext = react.createContext(null);
let tonConnectUI = null;
const TonConnectUIProvider = (_a) => {
  var _b = _a, {
    children
  } = _b, options = __objRest(_b, [
    "children"
  ]);
  if (isClientSide() && !tonConnectUI) {
    tonConnectUI = new ui.TonConnectUI(options);
  }
  return /* @__PURE__ */ jsxRuntime.jsx(TonConnectUIContext.Provider, { value: tonConnectUI, children });
};
const TonConnectUIProvider$1 = react.memo(TonConnectUIProvider);
class TonConnectUIReactError extends ui.TonConnectUIError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, TonConnectUIReactError.prototype);
  }
}
class TonConnectProviderNotSetError extends TonConnectUIReactError {
  constructor(...args) {
    super(...args);
    Object.setPrototypeOf(this, TonConnectProviderNotSetError.prototype);
  }
}
function checkProvider(provider) {
  if (!provider) {
    throw new TonConnectProviderNotSetError(
      "You should add <TonConnectUIProvider> on the top of the app to use TonConnect"
    );
  }
  return true;
}
function useTonConnectUI() {
  const tonConnectUI2 = react.useContext(TonConnectUIContext);
  const setOptions = react.useCallback(
    (options) => {
      if (tonConnectUI2) {
        tonConnectUI2.uiOptions = options;
      }
    },
    [tonConnectUI2]
  );
  if (isServerSide()) {
    return [null, () => {
    }];
  }
  checkProvider(tonConnectUI2);
  return [tonConnectUI2, setOptions];
}
const buttonRootId = "ton-connect-button";
const TonConnectButton = ({ className, style }) => {
  const [_, setOptions] = useTonConnectUI();
  react.useEffect(() => {
    setOptions({ buttonRootId });
    return () => setOptions({ buttonRootId: null });
  }, [setOptions]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      id: buttonRootId,
      className,
      style: __spreadValues({ width: "fit-content" }, style)
    }
  );
};
const TonConnectButton$1 = react.memo(TonConnectButton);
function useTonWallet() {
  const [tonConnectUI2] = useTonConnectUI();
  const [wallet, setWallet] = react.useState(
    (tonConnectUI2 == null ? void 0 : tonConnectUI2.wallet) || null
  );
  react.useEffect(() => {
    if (tonConnectUI2) {
      setWallet(tonConnectUI2.wallet);
      return tonConnectUI2.onStatusChange((value) => {
        setWallet(value);
      });
    }
  }, [tonConnectUI2]);
  return wallet;
}
function useTonAddress(userFriendly = true) {
  const wallet = useTonWallet();
  return react.useMemo(() => {
    if (wallet) {
      return userFriendly ? ui.toUserFriendlyAddress(
        wallet.account.address,
        wallet.account.chain === ui.CHAIN.TESTNET
      ) : wallet.account.address;
    } else {
      return "";
    }
  }, [wallet, userFriendly, wallet == null ? void 0 : wallet.account.address, wallet == null ? void 0 : wallet.account.chain]);
}
function useTonConnectModal() {
  const [tonConnectUI2] = useTonConnectUI();
  const [state, setState] = react.useState((tonConnectUI2 == null ? void 0 : tonConnectUI2.modal.state) || null);
  react.useEffect(() => {
    if (tonConnectUI2) {
      setState(tonConnectUI2.modal.state);
      return tonConnectUI2.onModalStateChange((value) => {
        setState(value);
      });
    }
  }, [tonConnectUI2]);
  return {
    state,
    open: () => tonConnectUI2 == null ? void 0 : tonConnectUI2.modal.open(),
    close: () => tonConnectUI2 == null ? void 0 : tonConnectUI2.modal.close()
  };
}
function useIsConnectionRestored() {
  const [restored, setRestored] = react.useState(false);
  const [tonConnectUI2] = useTonConnectUI();
  react.useEffect(() => {
    if (tonConnectUI2) {
      tonConnectUI2.connectionRestored.then(() => setRestored(true));
    }
  }, [tonConnectUI2]);
  return restored;
}
exports.TonConnectButton = TonConnectButton$1;
exports.TonConnectProviderNotSetError = TonConnectProviderNotSetError;
exports.TonConnectUIContext = TonConnectUIContext;
exports.TonConnectUIProvider = TonConnectUIProvider$1;
exports.TonConnectUIReactError = TonConnectUIReactError;
exports.useIsConnectionRestored = useIsConnectionRestored;
exports.useTonAddress = useTonAddress;
exports.useTonConnectModal = useTonConnectModal;
exports.useTonConnectUI = useTonConnectUI;
exports.useTonWallet = useTonWallet;
Object.keys(ui).forEach((k) => {
  if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k))
    Object.defineProperty(exports, k, {
      enumerable: true,
      get: () => ui[k]
    });
});
//# sourceMappingURL=index.cjs.map
