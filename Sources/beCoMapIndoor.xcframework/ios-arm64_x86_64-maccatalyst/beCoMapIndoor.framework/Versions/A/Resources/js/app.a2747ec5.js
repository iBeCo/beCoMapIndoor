(function(){'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function $$jscomp$owns$($obj$$, $prop$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $prop$$);
};
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function($target$$, $var_args$$) {
  for (var $i$$ = 1; $i$$ < arguments.length; $i$$++) {
    var $source$$ = arguments[$i$$];
    if ($source$$) {
      for (var $key$$ in $source$$) {
        $jscomp.owns($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
      }
    }
  }
  return $target$$;
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
  $target$$ != Array.prototype && $target$$ != Object.prototype && ($target$$[$property$$] = $descriptor$$.value);
};
$jscomp.getGlobal = function $$jscomp$getGlobal$($maybeGlobal$$) {
  return "undefined" != typeof window && window === $maybeGlobal$$ ? $maybeGlobal$$ : "undefined" != typeof global && null != global ? global : $maybeGlobal$$;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function $$jscomp$polyfill$($property$jscomp$5_split_target$$, $impl_polyfill$$, $fromLang_obj$$, $i$$) {
  if ($impl_polyfill$$) {
    $fromLang_obj$$ = $jscomp.global;
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$.split(".");
    for ($i$$ = 0; $i$$ < $property$jscomp$5_split_target$$.length - 1; $i$$++) {
      var $key$$ = $property$jscomp$5_split_target$$[$i$$];
      $key$$ in $fromLang_obj$$ || ($fromLang_obj$$[$key$$] = {});
      $fromLang_obj$$ = $fromLang_obj$$[$key$$];
    }
    $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$[$property$jscomp$5_split_target$$.length - 1];
    $i$$ = $fromLang_obj$$[$property$jscomp$5_split_target$$];
    $impl_polyfill$$ = $impl_polyfill$$($i$$);
    $impl_polyfill$$ != $i$$ && null != $impl_polyfill$$ && $jscomp.defineProperty($fromLang_obj$$, $property$jscomp$5_split_target$$, {configurable:!0, writable:!0, value:$impl_polyfill$$});
  }
};
$jscomp.polyfill("Object.assign", function($orig$$) {
  return $orig$$ || $jscomp.assign;
}, "es6", "es3");
$jscomp.checkEs6ConformanceViaProxy = function $$jscomp$checkEs6ConformanceViaProxy$() {
  try {
    var $proxied$$ = {}, $proxy$$ = Object.create(new $jscomp.global.Proxy($proxied$$, {get:function($target$$, $key$$, $receiver$$) {
      return $target$$ == $proxied$$ && "q" == $key$$ && $receiver$$ == $proxy$$;
    }}));
    return !0 === $proxy$$.q;
  } catch ($err$$) {
    return !1;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.arrayIteratorImpl = function $$jscomp$arrayIteratorImpl$($array$$) {
  var $index$$ = 0;
  return function() {
    return $index$$ < $array$$.length ? {done:!1, value:$array$$[$index$$++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function $$jscomp$arrayIterator$($array$$) {
  return {next:$jscomp.arrayIteratorImpl($array$$)};
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function $$jscomp$initSymbol$() {
  $jscomp.initSymbol = function $$jscomp$initSymbol$() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function $$jscomp$SymbolClass$($id$$, $opt_description$$) {
  this.$jscomp$symbol$id_ = $id$$;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:$opt_description$$});
};
$jscomp.SymbolClass.prototype.toString = function $$jscomp$SymbolClass$$toString$() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function $Symbol$$($opt_description$$) {
    if (this instanceof $Symbol$$) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + ($opt_description$$ || "") + "_" + $counter$$++, $opt_description$$);
  }
  var $counter$$ = 0;
  return $Symbol$$;
}();
$jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  $jscomp.initSymbol();
  var $symbolIterator$$ = $jscomp.global.Symbol.iterator;
  $symbolIterator$$ || ($symbolIterator$$ = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[$symbolIterator$$] && $jscomp.defineProperty(Array.prototype, $symbolIterator$$, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  };
};
$jscomp.initSymbolAsyncIterator = function $$jscomp$initSymbolAsyncIterator$() {
  $jscomp.initSymbol();
  var $symbolAsyncIterator$$ = $jscomp.global.Symbol.asyncIterator;
  $symbolAsyncIterator$$ || ($symbolAsyncIterator$$ = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function $$jscomp$initSymbolAsyncIterator$() {
  };
};
$jscomp.iteratorPrototype = function $$jscomp$iteratorPrototype$($iterator$$) {
  $jscomp.initSymbolIterator();
  $iterator$$ = {next:$iterator$$};
  $iterator$$[$jscomp.global.Symbol.iterator] = function $$iterator$$$$jscomp$global$Symbol$iterator$() {
    return this;
  };
  return $iterator$$;
};
$jscomp.makeIterator = function $$jscomp$makeIterator$($iterable$$) {
  var $iteratorFunction$$ = "undefined" != typeof Symbol && Symbol.iterator && $iterable$$[Symbol.iterator];
  return $iteratorFunction$$ ? $iteratorFunction$$.call($iterable$$) : $jscomp.arrayIterator($iterable$$);
};
$jscomp.polyfill("WeakMap", function($NativeWeakMap$$) {
  function $isConformant$$() {
    if (!$NativeWeakMap$$ || !Object.seal) {
      return !1;
    }
    try {
      var $x$$ = Object.seal({}), $y$$ = Object.seal({}), $map$$ = new $NativeWeakMap$$([[$x$$, 2], [$y$$, 3]]);
      if (2 != $map$$.get($x$$) || 3 != $map$$.get($y$$)) {
        return !1;
      }
      $map$$.delete($x$$);
      $map$$.set($y$$, 4);
      return !$map$$.has($x$$) && 4 == $map$$.get($y$$);
    } catch ($err$$) {
      return !1;
    }
  }
  function $WeakMapMembership$$() {
  }
  function $insert$$($target$$) {
    if (!$jscomp.owns($target$$, $prop$$)) {
      var $obj$$ = new $WeakMapMembership$$;
      $jscomp.defineProperty($target$$, $prop$$, {value:$obj$$});
    }
  }
  function $patch$$($name$$) {
    var $prev$$ = Object[$name$$];
    $prev$$ && (Object[$name$$] = function $Object$$name$$$($target$$) {
      if ($target$$ instanceof $WeakMapMembership$$) {
        return $target$$;
      }
      $insert$$($target$$);
      return $prev$$($target$$);
    });
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeWeakMap$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeWeakMap$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeWeakMap$$;
    }
  }
  var $prop$$ = "$jscomp_hidden_" + Math.random();
  $patch$$("freeze");
  $patch$$("preventExtensions");
  $patch$$("seal");
  var $index$$ = 0, $PolyfillWeakMap$$ = function $$PolyfillWeakMap$$$($iter$jscomp$1_opt_iterable$$) {
    this.id_ = ($index$$ += Math.random() + 1).toString();
    if ($iter$jscomp$1_opt_iterable$$) {
      $iter$jscomp$1_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$1_opt_iterable$$);
      for (var $entry_item$$; !($entry_item$$ = $iter$jscomp$1_opt_iterable$$.next()).done;) {
        $entry_item$$ = $entry_item$$.value, this.set($entry_item$$[0], $entry_item$$[1]);
      }
    }
  };
  $PolyfillWeakMap$$.prototype.set = function $$PolyfillWeakMap$$$$set$($key$$, $value$$) {
    $insert$$($key$$);
    if (!$jscomp.owns($key$$, $prop$$)) {
      throw Error("WeakMap key fail: " + $key$$);
    }
    $key$$[$prop$$][this.id_] = $value$$;
    return this;
  };
  $PolyfillWeakMap$$.prototype.get = function $$PolyfillWeakMap$$$$get$($key$$) {
    return $jscomp.owns($key$$, $prop$$) ? $key$$[$prop$$][this.id_] : void 0;
  };
  $PolyfillWeakMap$$.prototype.has = function $$PolyfillWeakMap$$$$has$($key$$) {
    return $jscomp.owns($key$$, $prop$$) && $jscomp.owns($key$$[$prop$$], this.id_);
  };
  $PolyfillWeakMap$$.prototype.delete = function $$PolyfillWeakMap$$$$delete$($key$$) {
    return $jscomp.owns($key$$, $prop$$) && $jscomp.owns($key$$[$prop$$], this.id_) ? delete $key$$[$prop$$][this.id_] : !1;
  };
  return $PolyfillWeakMap$$;
}, "es6", "es3");
$jscomp.MapEntry = function $$jscomp$MapEntry$() {
};
$jscomp.polyfill("Map", function($NativeMap$$) {
  function $isConformant$$() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !$NativeMap$$ || "function" != typeof $NativeMap$$ || !$NativeMap$$.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var $key$$ = Object.seal({x:4}), $map$$ = new $NativeMap$$($jscomp.makeIterator([[$key$$, "s"]]));
      if ("s" != $map$$.get($key$$) || 1 != $map$$.size || $map$$.get({x:4}) || $map$$.set({x:4}, "t") != $map$$ || 2 != $map$$.size) {
        return !1;
      }
      var $iter$$ = $map$$.entries(), $item$$ = $iter$$.next();
      if ($item$$.done || $item$$.value[0] != $key$$ || "s" != $item$$.value[1]) {
        return !1;
      }
      $item$$ = $iter$$.next();
      return $item$$.done || 4 != $item$$.value[0].x || "t" != $item$$.value[1] || !$iter$$.next().done ? !1 : !0;
    } catch ($err$$) {
      return !1;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if ($NativeMap$$ && $jscomp.ES6_CONFORMANCE) {
      return $NativeMap$$;
    }
  } else {
    if ($isConformant$$()) {
      return $NativeMap$$;
    }
  }
  $jscomp.initSymbolIterator();
  var $idMap$$ = new WeakMap, $PolyfillMap$$ = function $$PolyfillMap$$$($iter$jscomp$3_opt_iterable$$) {
    this.data_ = {};
    this.head_ = $createHead$$();
    this.size = 0;
    if ($iter$jscomp$3_opt_iterable$$) {
      $iter$jscomp$3_opt_iterable$$ = $jscomp.makeIterator($iter$jscomp$3_opt_iterable$$);
      for (var $entry$jscomp$1_item$$; !($entry$jscomp$1_item$$ = $iter$jscomp$3_opt_iterable$$.next()).done;) {
        $entry$jscomp$1_item$$ = $entry$jscomp$1_item$$.value, this.set($entry$jscomp$1_item$$[0], $entry$jscomp$1_item$$[1]);
      }
    }
  };
  $PolyfillMap$$.prototype.set = function $$PolyfillMap$$$$set$($key$$, $value$$) {
    $key$$ = 0 === $key$$ ? 0 : $key$$;
    var $r$$ = $maybeGetEntry$$(this, $key$$);
    $r$$.list || ($r$$.list = this.data_[$r$$.id] = []);
    $r$$.entry ? $r$$.entry.value = $value$$ : ($r$$.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:$key$$, value:$value$$}, $r$$.list.push($r$$.entry), this.head_.previous.next = $r$$.entry, this.head_.previous = $r$$.entry, this.size++);
    return this;
  };
  $PolyfillMap$$.prototype.delete = function $$PolyfillMap$$$$delete$($key$jscomp$48_r$$) {
    $key$jscomp$48_r$$ = $maybeGetEntry$$(this, $key$jscomp$48_r$$);
    return $key$jscomp$48_r$$.entry && $key$jscomp$48_r$$.list ? ($key$jscomp$48_r$$.list.splice($key$jscomp$48_r$$.index, 1), $key$jscomp$48_r$$.list.length || delete this.data_[$key$jscomp$48_r$$.id], $key$jscomp$48_r$$.entry.previous.next = $key$jscomp$48_r$$.entry.next, $key$jscomp$48_r$$.entry.next.previous = $key$jscomp$48_r$$.entry.previous, $key$jscomp$48_r$$.entry.head = null, this.size--, !0) : !1;
  };
  $PolyfillMap$$.prototype.clear = function $$PolyfillMap$$$$clear$() {
    this.data_ = {};
    this.head_ = this.head_.previous = $createHead$$();
    this.size = 0;
  };
  $PolyfillMap$$.prototype.has = function $$PolyfillMap$$$$has$($key$$) {
    return !!$maybeGetEntry$$(this, $key$$).entry;
  };
  $PolyfillMap$$.prototype.get = function $$PolyfillMap$$$$get$($entry$jscomp$2_key$$) {
    return ($entry$jscomp$2_key$$ = $maybeGetEntry$$(this, $entry$jscomp$2_key$$).entry) && $entry$jscomp$2_key$$.value;
  };
  $PolyfillMap$$.prototype.entries = function $$PolyfillMap$$$$entries$() {
    return $makeIterator$$(this, function($entry$$) {
      return [$entry$$.key, $entry$$.value];
    });
  };
  $PolyfillMap$$.prototype.keys = function $$PolyfillMap$$$$keys$() {
    return $makeIterator$$(this, function($entry$$) {
      return $entry$$.key;
    });
  };
  $PolyfillMap$$.prototype.values = function $$PolyfillMap$$$$values$() {
    return $makeIterator$$(this, function($entry$$) {
      return $entry$$.value;
    });
  };
  $PolyfillMap$$.prototype.forEach = function $$PolyfillMap$$$$forEach$($callback$$, $opt_thisArg$$) {
    for (var $iter$$ = this.entries(), $entry$jscomp$6_item$$; !($entry$jscomp$6_item$$ = $iter$$.next()).done;) {
      $entry$jscomp$6_item$$ = $entry$jscomp$6_item$$.value, $callback$$.call($opt_thisArg$$, $entry$jscomp$6_item$$[1], $entry$jscomp$6_item$$[0], this);
    }
  };
  $PolyfillMap$$.prototype[Symbol.iterator] = $PolyfillMap$$.prototype.entries;
  var $maybeGetEntry$$ = function $$maybeGetEntry$$$($index$jscomp$70_map$$, $key$$) {
    var $id$jscomp$6_id$jscomp$inline_29_type$$ = $key$$ && typeof $key$$;
    "object" == $id$jscomp$6_id$jscomp$inline_29_type$$ || "function" == $id$jscomp$6_id$jscomp$inline_29_type$$ ? $idMap$$.has($key$$) ? $id$jscomp$6_id$jscomp$inline_29_type$$ = $idMap$$.get($key$$) : ($id$jscomp$6_id$jscomp$inline_29_type$$ = "" + ++$mapIndex$$, $idMap$$.set($key$$, $id$jscomp$6_id$jscomp$inline_29_type$$)) : $id$jscomp$6_id$jscomp$inline_29_type$$ = "p_" + $key$$;
    var $list$$ = $index$jscomp$70_map$$.data_[$id$jscomp$6_id$jscomp$inline_29_type$$];
    if ($list$$ && $jscomp.owns($index$jscomp$70_map$$.data_, $id$jscomp$6_id$jscomp$inline_29_type$$)) {
      for ($index$jscomp$70_map$$ = 0; $index$jscomp$70_map$$ < $list$$.length; $index$jscomp$70_map$$++) {
        var $entry$$ = $list$$[$index$jscomp$70_map$$];
        if ($key$$ !== $key$$ && $entry$$.key !== $entry$$.key || $key$$ === $entry$$.key) {
          return {id:$id$jscomp$6_id$jscomp$inline_29_type$$, list:$list$$, index:$index$jscomp$70_map$$, entry:$entry$$};
        }
      }
    }
    return {id:$id$jscomp$6_id$jscomp$inline_29_type$$, list:$list$$, index:-1, entry:void 0};
  }, $makeIterator$$ = function $$makeIterator$$$($map$$, $func$$) {
    var $entry$$ = $map$$.head_;
    return $jscomp.iteratorPrototype(function() {
      if ($entry$$) {
        for (; $entry$$.head != $map$$.head_;) {
          $entry$$ = $entry$$.previous;
        }
        for (; $entry$$.next != $entry$$.head;) {
          return $entry$$ = $entry$$.next, {done:!1, value:$func$$($entry$$)};
        }
        $entry$$ = null;
      }
      return {done:!0, value:void 0};
    });
  }, $createHead$$ = function $$createHead$$$() {
    var $head$$ = {};
    return $head$$.previous = $head$$.next = $head$$.head = $head$$;
  }, $mapIndex$$ = 0;
  return $PolyfillMap$$;
}, "es6", "es3");
(function($modules$$) {
  function $webpackJsonpCallback$$($data$$) {
    for (var $chunkIds$$ = $data$$[0], $moreModules$$ = $data$$[1], $executeModules$$ = $data$$[2], $moduleId$$, $chunkId$$, $i$$ = 0, $resolves$$ = []; $i$$ < $chunkIds$$.length; $i$$++) {
      $chunkId$$ = $chunkIds$$[$i$$], Object.prototype.hasOwnProperty.call($installedChunks$$, $chunkId$$) && $installedChunks$$[$chunkId$$] && $resolves$$.push($installedChunks$$[$chunkId$$][0]), $installedChunks$$[$chunkId$$] = 0;
    }
    for ($moduleId$$ in $moreModules$$) {
      Object.prototype.hasOwnProperty.call($moreModules$$, $moduleId$$) && ($modules$$[$moduleId$$] = $moreModules$$[$moduleId$$]);
    }
    for ($parentJsonpFunction$$ && $parentJsonpFunction$$($data$$); $resolves$$.length;) {
      $resolves$$.shift()();
    }
    $deferredModules$$.push.apply($deferredModules$$, $executeModules$$ || []);
    return $checkDeferredModules$$();
  }
  function $checkDeferredModules$$() {
    for (var $result$$, $i$$ = 0; $i$$ < $deferredModules$$.length; $i$$++) {
      for (var $deferredModule$$ = $deferredModules$$[$i$$], $fulfilled$$ = !0, $j$$ = 1; $j$$ < $deferredModule$$.length; $j$$++) {
        0 !== $installedChunks$$[$deferredModule$$[$j$$]] && ($fulfilled$$ = !1);
      }
      $fulfilled$$ && ($deferredModules$$.splice($i$$--, 1), $result$$ = $__webpack_require__$$($__webpack_require__$$.s = $deferredModule$$[0]));
    }
    return $result$$;
  }
  function $__webpack_require__$$($moduleId$$) {
    if ($installedModules$$[$moduleId$$]) {
      return $installedModules$$[$moduleId$$].exports;
    }
    var $module$$ = $installedModules$$[$moduleId$$] = {i:$moduleId$$, l:!1, exports:{}};
    $modules$$[$moduleId$$].call($module$$.exports, $module$$, $module$$.exports, $__webpack_require__$$);
    $module$$.l = !0;
    return $module$$.exports;
  }
  var $installedModules$$ = {}, $installedChunks$$ = {0:0}, $deferredModules$$ = [];
  $__webpack_require__$$.m = $modules$$;
  $__webpack_require__$$.c = $installedModules$$;
  $__webpack_require__$$.d = function $$__webpack_require__$$$d$($exports$$, $name$$, $getter$$) {
    $__webpack_require__$$.o($exports$$, $name$$) || Object.defineProperty($exports$$, $name$$, {enumerable:!0, get:$getter$$});
  };
  $__webpack_require__$$.r = function $$__webpack_require__$$$r$($exports$$) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty($exports$$, Symbol.toStringTag, {value:"Module"});
    Object.defineProperty($exports$$, "__esModule", {value:!0});
  };
  $__webpack_require__$$.t = function $$__webpack_require__$$$t$($value$$, $mode$$) {
    $mode$$ & 1 && ($value$$ = $__webpack_require__$$($value$$));
    if ($mode$$ & 8 || $mode$$ & 4 && "object" === typeof $value$$ && $value$$ && $value$$.__esModule) {
      return $value$$;
    }
    var $ns$$ = Object.create(null);
    $__webpack_require__$$.r($ns$$);
    Object.defineProperty($ns$$, "default", {enumerable:!0, value:$value$$});
    if ($mode$$ & 2 && "string" != typeof $value$$) {
      for (var $key$jscomp$0$$ in $value$$) {
        $__webpack_require__$$.d($ns$$, $key$jscomp$0$$, function($key$$) {
          return $value$$[$key$$];
        }.bind(null, $key$jscomp$0$$));
      }
    }
    return $ns$$;
  };
  $__webpack_require__$$.n = function $$__webpack_require__$$$n$($module$$) {
    var $getter$$ = $module$$ && $module$$.__esModule ? function getDefault() {
      return $module$$["default"];
    } : function getModuleExports() {
      return $module$$;
    };
    $__webpack_require__$$.d($getter$$, "a", $getter$$);
    return $getter$$;
  };
  $__webpack_require__$$.o = function $$__webpack_require__$$$o$($object$$, $property$$) {
    return Object.prototype.hasOwnProperty.call($object$$, $property$$);
  };
  $__webpack_require__$$.p = "";
  var $jsonpArray$$ = window.webpackJsonp = window.webpackJsonp || [], $oldJsonpFunction$$ = $jsonpArray$$.push.bind($jsonpArray$$);
  $jsonpArray$$.push = $webpackJsonpCallback$$;
  $jsonpArray$$ = $jsonpArray$$.slice();
  for (var $i$jscomp$0$$ = 0; $i$jscomp$0$$ < $jsonpArray$$.length; $i$jscomp$0$$++) {
    $webpackJsonpCallback$$($jsonpArray$$[$i$jscomp$0$$]);
  }
  var $parentJsonpFunction$$ = $oldJsonpFunction$$;
  $deferredModules$$.push([173, 1]);
  return $checkDeferredModules$$();
})({170:function($_View_module$jscomp$2_view$$, $exports$$, $__webpack_require__$$) {
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.attributionHtml = function attributionHtml() {
    return '<img src="public/images/jio.ico" /> Map data \u00a9' + (new Date).getFullYear() + " Reliance Jio";
  };
  $exports$$.imageSize = $exports$$.target = $exports$$.extent = $exports$$.projection = $exports$$.view = void 0;
  var $_Projection_projection$$ = $_interopRequireDefault$$($__webpack_require__$$(72));
  $__webpack_require__$$(219);
  $_View_module$jscomp$2_view$$ = $_interopRequireDefault$$($__webpack_require__$$(140));
  $__webpack_require__$$ = $__webpack_require__$$(0);
  var $extent$$ = [0, 0, 2800, 1280];
  $exports$$.extent = $extent$$;
  $exports$$.imageSize = [2800, 1280];
  $_Projection_projection$$ = new $_Projection_projection$$.default({code:"xkcd-image", units:"pixels", extent:$extent$$, axisOrientation:"ene"});
  $exports$$.projection = $_Projection_projection$$;
  $_View_module$jscomp$2_view$$ = new $_View_module$jscomp$2_view$$.default({projection:$_Projection_projection$$, center:(0, $__webpack_require__$$.getCenter)($extent$$), extent:$extent$$, zoom:2, minZoom:2, maxZoom:8});
  $exports$$.view = $_View_module$jscomp$2_view$$;
  $exports$$.target = "beco-container";
}, 171:function($module$$, $exports$$, $Route___webpack_require__$$) {
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $Route___webpack_require__$$(141);
  $Route___webpack_require__$$(220);
  $Route___webpack_require__$$(71);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  $_interopRequireDefault$$($Route___webpack_require__$$(222));
  $_interopRequireDefault$$($Route___webpack_require__$$(73));
  $_interopRequireDefault$$($Route___webpack_require__$$(136));
  $_interopRequireDefault$$($Route___webpack_require__$$(48));
  var $_extent$$ = $Route___webpack_require__$$(0), $_style$$ = $Route___webpack_require__$$(75), $_math$$ = $Route___webpack_require__$$(223);
  $Route___webpack_require__$$ = function() {
    function $Route$$($map$$) {
      if (!(this instanceof $Route$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.name = "Route";
      this.map = $map$$;
    }
    $_createClass$$($Route$$, [{key:"intermediatePointStyle", value:function intermediatePointStyle($name$$) {
      var $src$$ = "public/images/a.png";
      "a" == $name$$ ? $src$$ = "public/images/a.png" : "b" == $name$$ ? $src$$ = "public/images/b.png" : "c" == $name$$ ? $src$$ = "public/images/c.png" : "d" == $name$$ ? $src$$ = "public/images/d.png" : "e" == $name$$ && ($src$$ = "public/images/e.png");
      return new $_style$$.Style({image:new $_style$$.Icon({scale:1, crossOrigin:null, src:$src$$, anchor:[0.5, 0.5], anchorOrigin:"top-left"})});
    }}, {key:"previewStyle", value:function previewStyle() {
      return [new $_style$$.Style({stroke:new $_style$$.Stroke({color:"#0099EA", width:6}), fill:new $_style$$.Fill({color:"#40B3EF"})})];
    }}, {key:"splitLineString", value:function splitLineString($geometry_segmentLength$$, $minSegmentLength_n$$, $options$$) {
      var $splitPoints$$ = [], $coords$$ = $geometry_segmentLength$$.getCoordinates(), $coordIndex$$ = 0, $startPoint$$ = $coords$$[$coordIndex$$], $nextPoint$$ = $coords$$[$coordIndex$$ + 1], $angle$$ = (0, $_math$$.calculateAngle)($startPoint$$, $nextPoint$$, $options$$.alwaysUp);
      $minSegmentLength_n$$ = Math.ceil($geometry_segmentLength$$.getLength() / $minSegmentLength_n$$);
      $geometry_segmentLength$$ = $geometry_segmentLength$$.getLength() / $minSegmentLength_n$$;
      for (var $currentSegmentLength_distanceToSplitPoint$$ = $options$$.midPoints ? $geometry_segmentLength$$ / 2 : $geometry_segmentLength$$, $i$$ = 0; $i$$ <= $minSegmentLength_n$$; $i$$++) {
        var $distanceBetweenPoints_splitPointCoords$$ = (0, $_math$$.calculatePointsDistance)($startPoint$$, $nextPoint$$);
        $currentSegmentLength_distanceToSplitPoint$$ += $distanceBetweenPoints_splitPointCoords$$;
        if ($currentSegmentLength_distanceToSplitPoint$$ < $geometry_segmentLength$$) {
          if ($coordIndex$$++, $coordIndex$$ < $coords$$.length - 1) {
            $startPoint$$ = $coords$$[$coordIndex$$], $nextPoint$$ = $coords$$[$coordIndex$$ + 1], $angle$$ = (0, $_math$$.calculateAngle)($startPoint$$, $nextPoint$$, $options$$.alwaysUp), $i$$--;
          } else {
            $options$$.midPoints || ($distanceBetweenPoints_splitPointCoords$$ = $nextPoint$$, $options$$.extent && !(0, $_extent$$.containsCoordinate)($options$$.extent, $distanceBetweenPoints_splitPointCoords$$)) || ($distanceBetweenPoints_splitPointCoords$$.push($angle$$), $splitPoints$$.push($distanceBetweenPoints_splitPointCoords$$));
            break;
          }
        } else {
          $currentSegmentLength_distanceToSplitPoint$$ -= $geometry_segmentLength$$;
          $distanceBetweenPoints_splitPointCoords$$ = (0, $_math$$.calculateSplitPointCoords)($startPoint$$, $nextPoint$$, $distanceBetweenPoints_splitPointCoords$$, $currentSegmentLength_distanceToSplitPoint$$);
          $startPoint$$ = $distanceBetweenPoints_splitPointCoords$$.slice();
          if (!$options$$.extent || (0, $_extent$$.containsCoordinate)($options$$.extent, $distanceBetweenPoints_splitPointCoords$$)) {
            $distanceBetweenPoints_splitPointCoords$$.push($angle$$), $splitPoints$$.push($distanceBetweenPoints_splitPointCoords$$);
          }
          $currentSegmentLength_distanceToSplitPoint$$ = 0;
        }
      }
      return $splitPoints$$;
    }}, {key:"style", value:function style($feature$$, $resolution_style$$) {
      $resolution_style$$ = [];
      $feature$$.getProperties() && $feature$$.getProperties().routeType ? $resolution_style$$.push(new $_style$$.Style({stroke:new $_style$$.Stroke({color:"#b2c7f6", width:6}), fill:new $_style$$.Fill({color:"#9ba2b2"})})) : $resolution_style$$.push(new $_style$$.Style({stroke:new $_style$$.Stroke({color:"#0099EA", width:6}), fill:new $_style$$.Fill({color:"#40B3EF"})}));
      return $resolution_style$$;
    }}]);
    return $Route$$;
  }();
  $exports$$.default = $Route___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 172:function($module$$, $exports$$, $Image$jscomp$1___webpack_require__$$) {
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  $Image$jscomp$1___webpack_require__$$ = function() {
    function $Image$$() {
      if (!(this instanceof $Image$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    $_createClass$$($Image$$, null, [{key:"getImage", value:function getImage($category$$, $type$$) {
      var $path$$ = "public/images/small/";
      $type$$ && "big" == $type$$ && ($path$$ = "public/images/big/");
      return this.getImagePath($category$$, $path$$);
    }}, {key:"getImagePath", value:function getImagePath($category$$, $path$$) {
      switch($category$$) {
        case "Default":
          return $path$$ + "common.svg";
        case "Cafe":
          return $path$$ + "cafe.svg";
        case "Workstation":
          return $path$$ + "workstation.svg";
        case "Meeting":
          return $path$$ + "meeting.svg";
        case "Lab":
          return $path$$ + "lab.svg";
        case "Entrance":
          return $path$$ + "entrance.svg";
        case "Lift":
          return $path$$ + "lift.svg";
        case "Reception":
          return $path$$ + "reception.svg";
        case "Room":
          return $path$$ + "room.svg";
        case "Staircase":
          return $path$$ + "common.svg";
        case "Exit":
          return $path$$ + "exit.svg";
        case "Fire Exit":
          return $path$$ + "emergencyexit.svg";
        case "Restrooms":
          return $path$$ + "restrooms.svg";
        case "ATM":
          return $path$$ + "atm.svg";
        case "Baby Care Room":
          return $path$$ + "babycareroom.svg";
        case "Baggage Center":
          return $path$$ + "baggagecenter.svg";
        case "Drinking Water":
          return $path$$ + "drinkingwater.svg";
        case "Escalator":
          return $path$$ + "escalator.svg";
        case "Lost & Found":
          return $path$$ + "lostfound.svg";
        case "Pram Service":
          return $path$$ + "pramservice.svg";
        case "Restroom Differently Abled":
          return $path$$ + "Restroomfordifferentlyabled.svg";
        case "Customer Desk":
          return $path$$ + "customerdesk.svg";
        case "Wheelchair":
          return $path$$ + "wheelchair.svg";
        case "Community Center":
          return $path$$ + "communitycenter.svg";
        case "Auto Stand":
          return $path$$ + "autostand.svg";
        case "First Aid":
          return $path$$ + "firstaid.svg";
        case "Tailor":
          return $path$$ + "tailor.svg";
        case "Key Maker":
          return $path$$ + "keymaker.svg";
        default:
          return $path$$ + "common.svg";
      }
    }}]);
    return $Image$$;
  }();
  $exports$$.default = $Image$jscomp$1___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 173:function($module$$, $exports$$, $__webpack_require__$$) {
  function $_typeof$$($obj$jscomp$0$$) {
    $_typeof$$ = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function _typeof($obj$$) {
      return typeof $obj$$;
    } : function _typeof($obj$$) {
      return $obj$$ && "function" === typeof Symbol && $obj$$.constructor === Symbol && $obj$$ !== Symbol.prototype ? "symbol" : typeof $obj$$;
    };
    return $_typeof$$($obj$jscomp$0$$);
  }
  function $_getRequireWildcardCache$$() {
    if ("function" !== typeof WeakMap) {
      return null;
    }
    var $cache$$ = new WeakMap;
    $_getRequireWildcardCache$$ = function _getRequireWildcardCache() {
      return $cache$$;
    };
    return $cache$$;
  }
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  $__webpack_require__$$(181);
  var $_map$$ = $_interopRequireDefault$$($__webpack_require__$$(182));
  $_interopRequireDefault$$($__webpack_require__$$(171));
  var $data$$ = function _interopRequireWildcard($obj$$) {
    if ($obj$$ && $obj$$.__esModule) {
      return $obj$$;
    }
    if (null === $obj$$ || "object" !== $_typeof$$($obj$$) && "function" !== typeof $obj$$) {
      return {default:$obj$$};
    }
    var $cache$$ = $_getRequireWildcardCache$$();
    if ($cache$$ && $cache$$.has($obj$$)) {
      return $cache$$.get($obj$$);
    }
    var $newObj$$ = {}, $hasPropertyDescriptor$$ = Object.defineProperty && Object.getOwnPropertyDescriptor, $key$$;
    for ($key$$ in $obj$$) {
      if (Object.prototype.hasOwnProperty.call($obj$$, $key$$)) {
        var $desc$$ = $hasPropertyDescriptor$$ ? Object.getOwnPropertyDescriptor($obj$$, $key$$) : null;
        $desc$$ && ($desc$$.get || $desc$$.set) ? Object.defineProperty($newObj$$, $key$$, $desc$$) : $newObj$$[$key$$] = $obj$$[$key$$];
      }
    }
    $newObj$$.default = $obj$$;
    $cache$$ && $cache$$.set($obj$$, $newObj$$);
    return $newObj$$;
  }($__webpack_require__$$(228)), $map$$;
  window.GLOBALS = {DEBUG:!1};
  window.initMap = function $window$initMap$($floors$$, $params$$) {
    $map$$ = new $_map$$.default($data$$, $floors$$, $params$$);
    $map$$.init();
    $map$$.initializeWhereAmI();
  };
  window.BESetCurrentPosition = function $window$BESetCurrentPosition$($x$$, $y$$) {
    $map$$.updatePosition([$x$$, $y$$]);
  };
  window.getMap = function $window$getMap$() {
    return $map$$.getMap();
  };
  window.BESetMapLabels = function $window$BESetMapLabels$($x$$, $y$$) {
    $map$$.addLabels();
  };
  window.BESetMarkers = function $window$BESetMarkers$($geojsonObject$$) {
    $map$$.addMarkers($geojsonObject$$);
  };
  window.BESelectPoint = function $window$BESelectPoint$($id$$) {
    $map$$.selectPoint($id$$);
  };
  window.BEChangeFloor = function $window$BEChangeFloor$($id$$) {
    $map$$.clearRoute();
    $map$$.showFloorTile($id$$);
  };
  window.BEClearSelectedPoint = function $window$BEClearSelectedPoint$() {
    $map$$.clearSelectedPoint();
  };
  window.BEDrawRoutePreview = function $window$BEDrawRoutePreview$($routeArray$$) {
    $map$$.drawRoutePreview($routeArray$$);
  };
  window.BEClearRoutePreview = function $window$BEClearRoutePreview$() {
    $map$$.clearRoutePreview();
  };
  window.BEDrawRoute = function $window$BEDrawRoute$($nodeList$$, $coveredNodeList$$, $arrowObject$$) {
    $map$$.clearRoute();
    $arrowObject$$ && $map$$.addArrow($arrowObject$$);
    $nodeList$$ && $map$$.drawRoute($nodeList$$);
    $coveredNodeList$$ && $map$$.drawCoveredRoute($coveredNodeList$$);
  };
  window.BEUpdateRoute = function $window$BEUpdateRoute$($coveredNodeList$$, $arrowObject$$) {
    $coveredNodeList$$ && $map$$.drawCoveredRoute($coveredNodeList$$);
    $arrowObject$$ && $map$$.addArrow($arrowObject$$);
  };
  window.BEClearRoute = function $window$BEClearRoute$() {
    $map$$.clearRoute();
  };
  window.BERotate = function $window$BERotate$($angle$$, $coordinates$$) {
    $map$$.rotate($angle$$, $coordinates$$);
  };
  window.BEResetAngle = function $window$BEResetAngle$() {
    $map$$.resetAngle();
  };
  window.BEFocusToCurrentPosition = function $window$BEFocusToCurrentPosition$($x$$, $y$$) {
    $map$$.moveToPoint($x$$, $y$$);
  };
  window.BERemoveCurrentPosition = function $window$BERemoveCurrentPosition$() {
    $map$$.removeCurrentPosition();
  };
  window.BESetLocationMarker = function $window$BESetLocationMarker$($x$$, $y$$, $rotateAngle$$) {
    $map$$.setLocationMarker($x$$, $y$$, $rotateAngle$$);
  };
  window.BEChangeLocationMarkerAngle = function $window$BEChangeLocationMarkerAngle$($rotateAngle$$) {
    $map$$.changeDirection($rotateAngle$$);
  };
  window.BERemoveLocationMarker = function $window$BERemoveLocationMarker$() {
    $map$$.changeDirection(0);
    $map$$.removeLocationMarker();
  };
}, 181:function($module$$, $exports$$, $__webpack_require__$$) {
}, 182:function($module$$, $exports$$, $BeCoMap___webpack_require__$$) {
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $BeCoMap___webpack_require__$$(141);
  $BeCoMap___webpack_require__$$(71);
  $BeCoMap___webpack_require__$$(195);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  var $_underscore$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(128)), $_Map$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(138)), $_control$$ = $BeCoMap___webpack_require__$$(229), $_layer$$ = $BeCoMap___webpack_require__$$(231), $_Vector$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(139)), $_style$$ = $BeCoMap___webpack_require__$$(75), $_LineString$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(73)), $_Point$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(48)), 
  $_extent$$ = $BeCoMap___webpack_require__$$(0), $_easing$$ = $BeCoMap___webpack_require__$$(25), $_model$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(199)), $_model2$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(171)), $_arrow$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(224)), $_Feature$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(87)), $_model3$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(225)), $_images$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(172)), 
  $_model4$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(226)), $_model5$$ = $_interopRequireDefault$$($BeCoMap___webpack_require__$$(227)), $_projection$$ = $BeCoMap___webpack_require__$$(170);
  $BeCoMap___webpack_require__$$ = function() {
    function $BeCoMap$$($graphObject$$, $floorData$$, $params$$) {
      if (!(this instanceof $BeCoMap$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.floors = new $_model$$.default($floorData$$, $params$$);
      this.markers = new $_model3$$.default;
      this.labels = new $_model4$$.default;
      this.whereami = new $_model5$$.default;
      this.compassLayer = this.arrowLayer = this.vectorWayPointLayer = this.vectorRouteLayer = this.vectorLabelLayer = this.vectorMarkerLayer = this.map = null;
      this.route;
      this.arrow = new $_arrow$$.default;
      this.coveredRoute;
      this.routeLayer;
      this.color = $params$$ ? $params$$.color : "#C1D1A3";
      this.locationMarkerstyle = new $_style$$.Style({fill:new $_style$$.Fill({color:"rgba(0, 0, 255, 0.2)"}), image:new $_style$$.Icon({src:"public/images/direction.svg", rotateWithView:!0})});
    }
    $_createClass$$($BeCoMap$$, [{key:"init", value:function init() {
      document.getElementById("beco-container").style.backgroundColor = this.color;
      var $markerStyle$$ = this.markers.style(), $labelStyle$$ = this.labels.style();
      this.vectorMarkerLayer = new $_layer$$.Vector({title:"Markers", displayInLayerSwitcher:!1, zIndex:2, source:new $_Vector$$.default({features:[]}), style:function style($feature$$, $resolution$$) {
        $markerStyle$$.setImage(new $_style$$.Icon({scale:1, src:$_images$$.default.getImage($feature$$.get("icon")), anchor:[0.5, 0.5], anchorOrigin:"top-left"}));
        $markerStyle$$.getText().setFill(new $_style$$.Fill({color:$feature$$.get("category_color")}));
        2 > $resolution$$ ? $markerStyle$$.getText().setText($feature$$.get("name")) : $markerStyle$$.getText().setText("");
        return $markerStyle$$;
      }});
      this.vectorWayPointLayer = new $_layer$$.Vector({title:"WayPointLayer", displayInLayerSwitcher:!1, zIndex:2, source:new $_Vector$$.default({features:[]}), style:function style($feature$$, $resolution$$) {
        return $_this$$.route.intermediatePointStyle($feature$$.get("name"));
      }});
      this.arrowLayer = new $_layer$$.Vector({title:"ArrowLayer", displayInLayerSwitcher:!1, zIndex:2, source:new $_Vector$$.default({features:[]}), style:function style($feature$$, $resolution$$) {
        return $_this$$.arrow.style($feature$$);
      }});
      this.vectorMarkerLayer.getSource().on("addfeature", function($ft$$) {
      });
      this.vectorLabelLayer = new $_layer$$.Vector({title:"Labels", displayInLayerSwitcher:!1, declutter:!0, source:new $_Vector$$.default({features:[]}), style:function style($feature$$) {
        $labelStyle$$.getText().setText($feature$$.get("name"));
        return $labelStyle$$;
      }});
      this.compassLayer = new $_layer$$.Vector({title:"Compass", zIndex:2.5, displayInLayerSwitcher:!1, declutter:!0, source:new $_Vector$$.default({features:[]})});
      this.compassLayer.setStyle(this.locationMarkerstyle);
      this.map = new $_Map$$.default({layers:this.getLayers(), target:$_projection$$.target, view:$_projection$$.view, controls:this.showButtons()});
      this.floors.setInitialFloorTile();
      this.route = new $_model2$$.default(this.map);
      var $_this$$ = this;
      this.vectorRouteLayer = new $_layer$$.Vector({title:"Route Layer", displayInLayerSwitcher:!1, declutter:!0, zIndex:1, source:new $_Vector$$.default({features:[]}), style:function style($feature$$, $resolution$$) {
        return $feature$$.getProperties() && $feature$$.getProperties().preview ? $_this$$.route.previewStyle($feature$$) : $_this$$.route.style($feature$$, $resolution$$);
      }});
      this.map.addLayer(this.vectorRouteLayer);
      this.map.addInteraction(this.markers.getSelectFeature(this.vectorMarkerLayer));
      this.map.once("rendercomplete", function($event$$) {
        window.onRenderComplete();
      });
    }}, {key:"getLayers", value:function getLayers() {
      var $tileSource$$ = Object.assign([], this.floors.getTileSource());
      $tileSource$$.push(this.vectorMarkerLayer, this.vectorLabelLayer, this.compassLayer, this.vectorWayPointLayer, this.arrowLayer);
      return $tileSource$$;
    }}, {key:"getMapTileLabels", value:function getMapTileLabels() {
      var $layerArray$$ = this.map.getLayers().getArray(), $mapTile$$ = [];
      (0, $_underscore$$.default)($layerArray$$).each(function($layer$$) {
        $layer$$.getProperties().displayInLayerSwitcher && $mapTile$$.push($layer$$.getProperties());
      });
      return $mapTile$$;
    }}, {key:"showButtons", value:function showButtons() {
      return (0, $_control$$.defaults)({attributionOptions:{collapsible:!1}});
    }}, {key:"getMap", value:function getMap() {
      return this.map;
    }}, {key:"addLabels", value:function addLabels() {
      this.vectorLabelLayer.getSource().addFeatures(this.labels.getFeature());
    }}, {key:"addMarkers", value:function addMarkers($geojsonObject$$) {
      this.vectorMarkerLayer.getSource().clear();
      this.markers.clearSelectedPoint();
      this.vectorMarkerLayer.getSource().addFeatures(this.markers.getFeature($geojsonObject$$));
    }}, {key:"initializeWhereAmI", value:function initializeWhereAmI($coordinates$$) {
      this.whereami.init(this.map, $coordinates$$);
    }}, {key:"updatePosition", value:function updatePosition($coordinates$$) {
      this.whereami.setCurrentPoint($coordinates$$, this.map);
    }}, {key:"removeCurrentPosition", value:function removeCurrentPosition() {
      this.whereami.removeCurrentPoint(this.map);
    }}, {key:"showFloorTile", value:function showFloorTile($floorID$$) {
      this.floors.showFloorTile($floorID$$);
    }}, {key:"selectPoint", value:function selectPoint($id$$) {
      $id$$ && this.markers.selectPoint($id$$, this.map);
    }}, {key:"clearSelectedPoint", value:function clearSelectedPoint() {
      this.markers.clearSelectedPoint();
    }}, {key:"drawRoutePreview", value:function drawRoutePreview($previewObj$$) {
      var $_this$$ = this, $geometry$$;
      this.vectorRouteLayer.getSource().clear();
      this.vectorWayPointLayer.getSource().clear();
      this.arrowLayer.getSource().clear();
      this.map.getView().rotate(0);
      (0, $_underscore$$.default)($previewObj$$.route).each(function($feature$$) {
        $feature$$ = new $_Feature$$.default({geometry:new $_LineString$$.default($feature$$), preview:!0});
        null == $geometry$$ && ($geometry$$ = $feature$$.getGeometry());
        $_this$$.vectorRouteLayer.getSource().addFeature($feature$$);
      });
      (0, $_underscore$$.default)($previewObj$$.waypoint).each(function($waypoint$$) {
        $waypoint$$ = new $_Feature$$.default({geometry:new $_Point$$.default($waypoint$$.point), name:$waypoint$$.name});
        $_this$$.vectorWayPointLayer.getSource().addFeature($waypoint$$);
      });
      this.map.getView().fit($geometry$$, {size:$_this$$.map.getSize(), duration:1000, padding:[40, 40, 60, 40], easing:$_easing$$.easeOut});
    }}, {key:"clearRoutePreview", value:function clearRoutePreview() {
      this.vectorRouteLayer.getSource().clear();
      this.vectorWayPointLayer.getSource().clear();
    }}, {key:"drawRoute", value:function drawRoute($routeCoordinatesArray$$) {
      this.routeLayer && this.vectorRouteLayer.getSource().removeFeature(this.routeLayer);
      this.routeLayer = new $_Feature$$.default({geometry:new $_LineString$$.default($routeCoordinatesArray$$)});
      this.vectorRouteLayer.getSource().addFeature(this.routeLayer);
    }}, {key:"addArrow", value:function addArrow($arrow_arrowCoordinates$$) {
      this.arrowLayer && this.arrowLayer.getSource().clear();
      $arrow_arrowCoordinates$$ = new $_Feature$$.default({geometry:new $_LineString$$.default($arrow_arrowCoordinates$$)});
      this.arrowLayer.getSource().addFeature($arrow_arrowCoordinates$$);
    }}, {key:"drawCoveredRoute", value:function drawCoveredRoute($routeCoordinatesArray$$) {
      this.coveredRoute && this.vectorRouteLayer.getSource().removeFeature(this.coveredRoute);
      this.coveredRoute = new $_Feature$$.default({geometry:new $_LineString$$.default($routeCoordinatesArray$$), routeType:"coveredroute"});
      this.vectorRouteLayer.getSource().addFeature(this.coveredRoute);
    }}, {key:"clearRoute", value:function clearRoute() {
      this.vectorRouteLayer && (this.vectorRouteLayer.getSource().clear(), this.coveredRoute = this.routeLayer = null);
      this.vectorWayPointLayer && this.vectorWayPointLayer.getSource().clear();
      this.arrowLayer && this.arrowLayer.getSource().clear();
    }}, {key:"rotate", value:function rotate($angle$$, $coordinates$$) {
      this.map.getView().animate({duration:2000, rotation:$angle$$, easing:$_easing$$.easeOut});
      $angle$$ = new $_Feature$$.default({geometry:new $_LineString$$.default($coordinates$$)});
      this.map.getView().fit($angle$$.getGeometry().getExtent(), {size:this.map.getSize(), duration:1000, padding:[50, 50, 50, 50], easing:$_easing$$.easeOut});
    }}, {key:"moveToPoint", value:function moveToPoint($x$$, $y$$) {
      this.map.getView().animate({center:[$x$$, $y$$], duration:2000, easing:$_easing$$.easeIn});
    }}, {key:"resetAngle", value:function resetAngle() {
      this.map.getView().animate({center:(0, $_extent$$.getCenter)($_projection$$.extent), duration:2000, rotation:0, easing:$_easing$$.easeIn});
    }}, {key:"setWhereAmI", value:function setWhereAmI($feature$jscomp$11_x$$, $y$$) {
      $feature$jscomp$11_x$$ = new $_Feature$$.default(new $_Point$$.default([$feature$jscomp$11_x$$, $y$$]));
      this.vectorMarkerLayer.getSource().addFeature($feature$jscomp$11_x$$);
    }}, {key:"setLocationMarker", value:function setLocationMarker($feature$jscomp$12_x$$, $y$$, $rotateAngle$$) {
      this.compassLayer.getSource().clear();
      $feature$jscomp$12_x$$ = new $_Feature$$.default(new $_Point$$.default([$feature$jscomp$12_x$$, $y$$]));
      this.compassLayer.getSource().addFeature($feature$jscomp$12_x$$);
      $rotateAngle$$ && 0 <= $rotateAngle$$ && this.locationMarkerstyle.getImage().setRotation(Math.PI / 180 * $rotateAngle$$);
    }}, {key:"changeDirection", value:function changeDirection($rotateAngle$$) {
      0 <= $rotateAngle$$ && (this.locationMarkerstyle.getImage().setRotation(Math.PI / 180 * $rotateAngle$$), this.compassLayer.getSource().refresh());
    }}, {key:"removeCurrentPosition", value:function removeCurrentPosition() {
      this.whereami.removeCurrentPoint(this.map);
    }}, {key:"removeLocationMarker", value:function removeLocationMarker() {
      this.compassLayer && this.compassLayer.getSource().clear();
    }}]);
    return $BeCoMap$$;
  }();
  $exports$$.default = $BeCoMap___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 199:function($module$$, $exports$$, $Floors___webpack_require__$$) {
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $Floors___webpack_require__$$(130);
  $Floors___webpack_require__$$(71);
  $Floors___webpack_require__$$(162);
  $Floors___webpack_require__$$(167);
  $Floors___webpack_require__$$(168);
  $Floors___webpack_require__$$(169);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  var $_underscore$$ = $_interopRequireDefault$$($Floors___webpack_require__$$(128)), $_Image$$ = $_interopRequireDefault$$($Floors___webpack_require__$$(129)), $_ImageStatic$$ = $_interopRequireDefault$$($Floors___webpack_require__$$(230)), $_projection$$ = $Floors___webpack_require__$$(170);
  $Floors___webpack_require__$$ = function() {
    function $Floors$$($floors$$, $params$$) {
      if (!(this instanceof $Floors$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.name = "Floors";
      this.floors = $floors$$;
      this.tileSources = new Map;
      this.tileArray = [];
      this.currentFloorId = $params$$ ? $params$$.default_floor_id : this.floors[0].id;
      this.init();
    }
    $_createClass$$($Floors$$, [{key:"toString", value:function toString() {
      return this.name;
    }}, {key:"getCurrentFloorID", value:function getCurrentFloorID() {
      return this.currentFloorId;
    }}, {key:"init", value:function init() {
      var $_this$$ = this;
      $_this$$.floors && (0, $_underscore$$.default)($_this$$.floors).each(function($floor$$) {
        var $tileSource$$ = new $_Image$$.default({title:$floor$$.label, displayInLayerSwitcher:!0, tileId:$floor$$.id, source:new $_ImageStatic$$.default({attributions:(0, $_projection$$.attributionHtml)(), url:$floor$$.image, imageSize:$_projection$$.imageSize, projection:$_projection$$.projection, imageExtent:$_projection$$.extent})});
        $_this$$.tileArray.push($tileSource$$);
        $_this$$.tileSources.set($floor$$.id, $tileSource$$);
      });
    }}, {key:"getTileSource", value:function getTileSource() {
      return this.tileArray.reverse();
    }}, {key:"getFloorTile", value:function getFloorTile($floorID$$) {
      return this.tileSources.get($floorID$$);
    }}, {key:"showFloorTile", value:function showFloorTile($floorID$$) {
      this.currentFloorId != $floorID$$ && ((0, $_underscore$$.default)(this.tileArray).each(function($layer$$) {
        $layer$$.getProperties().tileId == $floorID$$ ? $layer$$.setVisible(!0) : $layer$$.setVisible(!1);
      }), this.currentFloorId = $floorID$$);
    }}, {key:"setInitialFloorTile", value:function setInitialFloorTile() {
      if (this.currentFloorId) {
        var $currentFloorId$$ = this.currentFloorId;
        (0, $_underscore$$.default)(this.tileArray).each(function($layer$$) {
          $layer$$.getProperties().tileId == $currentFloorId$$ ? $layer$$.setVisible(!0) : $layer$$.setVisible(!1);
        });
      }
    }}]);
    return $Floors$$;
  }();
  $exports$$.default = $Floors___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 219:function($module$$, $exports$$, $__webpack_require__$$) {
}, 222:function($module$$, $exports$$, $BecoMapMath___webpack_require__$$) {
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  $BecoMapMath___webpack_require__$$ = function() {
    function $BecoMapMath$$() {
      if (!(this instanceof $BecoMapMath$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    $_createClass$$($BecoMapMath$$, null, [{key:"determinant", value:function determinant($matrix$$) {
      return $matrix$$[0][0] * $matrix$$[1][1] - $matrix$$[0][1] * $matrix$$[1][0];
    }}, {key:"isLeft", value:function isLeft($x1$$, $y1$$, $x2$$, $y2$$, $x3$$, $y3$$) {
      return 0 > this.determinant([[$x1$$ - $x3$$, $x2$$ - $x3$$], [$y1$$ - $y3$$, $y2$$ - $y3$$]]);
    }}, {key:"getDistanceBetweenTwoPoints", value:function getDistanceBetweenTwoPoints($x1$$, $y1$$, $x2$$, $y2$$) {
      return Math.sqrt(Math.pow($x2$$ - $x1$$, 2) + Math.pow($y2$$ - $y1$$, 2));
    }}, {key:"getAngleBetweenTwoPoints", value:function getAngleBetweenTwoPoints($c_x1$$, $y1$$, $a_x2$$, $y2$$, $x3$$, $y3$$) {
      var $angle$$ = this.getDistanceBetweenTwoPoints($c_x1$$, $y1$$, $a_x2$$, $y2$$);
      $a_x2$$ = this.getDistanceBetweenTwoPoints($a_x2$$, $y2$$, $x3$$, $y3$$);
      $c_x1$$ = this.getDistanceBetweenTwoPoints($c_x1$$, $y1$$, $x3$$, $y3$$);
      $angle$$ = (Math.pow($angle$$, 2) + Math.pow($a_x2$$, 2) - Math.pow($c_x1$$, 2)) / (2 * $a_x2$$ * $angle$$);
      $angle$$ = Math.acos($angle$$);
      $angle$$ *= 180 / Math.PI;
      88 <= $angle$$ && 92 >= $angle$$ ? $angle$$ = 90 : 170 <= $angle$$ && 191 >= $angle$$ ? $angle$$ = 180 : 268 <= $angle$$ && 272 >= $angle$$ ? $angle$$ = 270 : 358 <= $angle$$ && 2 >= $angle$$ && ($angle$$ = 360);
      return $angle$$;
    }}, {key:"getMidPointBetweenTwoPoints", value:function getMidPointBetweenTwoPoints($x1$$, $y1$$, $x2$$, $y2$$) {
      return [$x1$$ + 0.5 * ($x2$$ - $x1$$), $y1$$ + 0.5 * ($y2$$ - $y1$$)];
    }}, {key:"getDegreeBetweenTwoPoints", value:function getDegreeBetweenTwoPoints($x1$$, $y1$$, $x2$$, $y2$$) {
      return this.toDegrees(Math.atan2($y1$$ - $y2$$, $x1$$ - $x2$$));
    }}, {key:"getRadianBetweenTwoPoints", value:function getRadianBetweenTwoPoints($x1$$, $y1$$, $x2$$, $y2$$) {
      return Math.atan2($y1$$ - $y2$$, $x1$$ - $x2$$);
    }}, {key:"toDegrees", value:function toDegrees($angle$$) {
      return 180 / Math.PI * $angle$$;
    }}, {key:"slope", value:function slope($a$$, $b$$) {
      return $a$$[0] == $b$$[0] ? null : ($b$$[1] - $a$$[1]) / ($b$$[0] - $a$$[0]);
    }}, {key:"intercept", value:function intercept($point$$, $slope$$) {
      return null === $slope$$ ? $point$$[0] : $point$$[1] - $slope$$ * $point$$[0];
    }}, {key:"coordinates", value:function coordinates$jscomp$0($A_x$$, $B$$) {
      var $m$$ = this.slope($A_x$$, $B$$), $b$$ = this.intercept($A_x$$, $m$$);
      console.log($m$$, $b$$);
      var $coordinates$$ = [];
      for ($A_x$$ = $A_x$$[0]; $A_x$$ <= $B$$[0]; $A_x$$++) {
        $coordinates$$.push([$A_x$$, $m$$ * $A_x$$ + $b$$]);
      }
      return $coordinates$$;
    }}, {key:"getInitialRotationAngle", value:function getInitialRotationAngle($exitAngle_node1$$, $node2$$, $mapHeight$$) {
      var $baseAngle_y1$$ = parseFloat($mapHeight$$), $y2$$ = $mapHeight$$ - 10;
      $exitAngle_node1$$ = this.getRadianBetweenTwoPoints($exitAngle_node1$$.x, $mapHeight$$ - $exitAngle_node1$$.y, $node2$$.x, $mapHeight$$ - $node2$$.y);
      $baseAngle_y1$$ = this.getRadianBetweenTwoPoints(0, $baseAngle_y1$$, 0, $y2$$);
      return $exitAngle_node1$$ - $baseAngle_y1$$ + Math.PI;
    }}, {key:"radians", value:function radians($degrees$$) {
      return $degrees$$ * Math.PI / 180;
    }}, {key:"degrees", value:function degrees($radians$$) {
      return 180 * $radians$$ / Math.PI;
    }}, {key:"calculateZoom", value:function calculateZoom($node1$$, $node2$$) {
    }}]);
    return $BecoMapMath$$;
  }();
  $exports$$.default = $BecoMapMath___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 223:function($module$$, $exports$$, $__webpack_require__$$) {
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.calculatePointsDistance = function calculatePointsDistance($coord1_dy$$, $coord2$$) {
    var $dx$$ = $coord1_dy$$[0] - $coord2$$[0];
    $coord1_dy$$ = $coord1_dy$$[1] - $coord2$$[1];
    return Math.sqrt($dx$$ * $dx$$ + $coord1_dy$$ * $coord1_dy$$);
  };
  $exports$$.calculateSplitPointCoords = function calculateSplitPointCoords($startNode$$, $nextNode$$, $d_distanceBetweenNodes$$, $distanceToSplitPoint$$) {
    $d_distanceBetweenNodes$$ = $distanceToSplitPoint$$ / $d_distanceBetweenNodes$$;
    return [$nextNode$$[0] + ($startNode$$[0] - $nextNode$$[0]) * $d_distanceBetweenNodes$$, $nextNode$$[1] + ($startNode$$[1] - $nextNode$$[1]) * $d_distanceBetweenNodes$$];
  };
  $exports$$.calculateAngle = function calculateAngle($startNode$jscomp$1_y$$, $nextNode$$, $alwaysUp$$) {
    var $x$$ = $startNode$jscomp$1_y$$[0] - $nextNode$$[0];
    $startNode$jscomp$1_y$$ = $startNode$jscomp$1_y$$[1] - $nextNode$$[1];
    return $alwaysUp$$ ? Math.atan($x$$ / $startNode$jscomp$1_y$$) : Math.atan2($x$$, $startNode$jscomp$1_y$$);
  };
}, 224:function($module$$, $exports$$, $Arrow___webpack_require__$$) {
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $Arrow___webpack_require__$$(71);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  var $_style$$ = $Arrow___webpack_require__$$(75), $_Point$$ = function _interopRequireDefault($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }($Arrow___webpack_require__$$(48));
  $Arrow___webpack_require__$$ = function() {
    function $Arrow$$() {
      if (!(this instanceof $Arrow$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.name = "Arrow";
    }
    $_createClass$$($Arrow$$, [{key:"style", value:function style($end$jscomp$6_feature$$) {
      var $coOrdinated_rotation$jscomp$3_start$$ = $end$jscomp$6_feature$$.getGeometry().getCoordinates();
      $end$jscomp$6_feature$$ = $coOrdinated_rotation$jscomp$3_start$$[$coOrdinated_rotation$jscomp$3_start$$.length - 1];
      $coOrdinated_rotation$jscomp$3_start$$ = $coOrdinated_rotation$jscomp$3_start$$[$coOrdinated_rotation$jscomp$3_start$$.length - 2];
      $coOrdinated_rotation$jscomp$3_start$$ = Math.atan2($end$jscomp$6_feature$$[1] - $coOrdinated_rotation$jscomp$3_start$$[1], $end$jscomp$6_feature$$[0] - $coOrdinated_rotation$jscomp$3_start$$[0]);
      return [new $_style$$.Style({stroke:new $_style$$.Stroke({color:"#35393A", width:8})}), new $_style$$.Style({stroke:new $_style$$.Stroke({color:"#FFFFFF", width:6})}), new $_style$$.Style({geometry:new $_Point$$.default($end$jscomp$6_feature$$), image:new $_style$$.Icon({src:"public/images/arrow2.png", anchor:[0.5, 0.55], rotateWithView:!0, rotation:-$coOrdinated_rotation$jscomp$3_start$$})})];
    }}]);
    return $Arrow$$;
  }();
  $exports$$.default = $Arrow___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 225:function($module$$, $exports$$, $Markers___webpack_require__$$) {
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $Markers___webpack_require__$$(130);
  $Markers___webpack_require__$$(71);
  $Markers___webpack_require__$$(162);
  $Markers___webpack_require__$$(167);
  $Markers___webpack_require__$$(168);
  $Markers___webpack_require__$$(169);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  var $_underscore$$ = $_interopRequireDefault$$($Markers___webpack_require__$$(128));
  $_interopRequireDefault$$($Markers___webpack_require__$$(87));
  $_interopRequireDefault$$($Markers___webpack_require__$$(48));
  var $_style$$ = $Markers___webpack_require__$$(75), $_GeoJSON$$ = $_interopRequireDefault$$($Markers___webpack_require__$$(136)), $_Select$$ = $_interopRequireDefault$$($Markers___webpack_require__$$(135)), $_condition$$ = $Markers___webpack_require__$$(18), $_images$$ = $_interopRequireDefault$$($Markers___webpack_require__$$(172));
  $Markers___webpack_require__$$ = function() {
    function $Markers$$() {
      if (!(this instanceof $Markers$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.name = "Markers";
      this.points;
      this.select;
      this.markers = new Map;
      this.selectedPoint;
    }
    $_createClass$$($Markers$$, [{key:"toString", value:function toString() {
      return this.name;
    }}, {key:"setPoints", value:function setPoints($points$$) {
      this.points = $points$$;
    }}, {key:"style", value:function style() {
      return new $_style$$.Style({text:new $_style$$.Text({offsetY:20, font:"bold 10px Open Sans,sans-serif", fill:new $_style$$.Fill({color:"#F90F00"}), stroke:new $_style$$.Stroke({color:"#eee", width:0.5})})});
    }}, {key:"styleSelected", value:function styleSelected($category$$, $text$$, $color$$) {
      return new $_style$$.Style({image:new $_style$$.Icon({scale:1, crossOrigin:null, src:$_images$$.default.getImage($category$$, "big"), anchor:[0.5, 0.5], anchorOrigin:"top-left"}), text:new $_style$$.Text({offsetY:30, text:$text$$, font:"bold 10px Open Sans,sans-serif", fill:new $_style$$.Fill({color:$color$$}), stroke:new $_style$$.Stroke({color:"#eee", width:0.5})})});
    }}, {key:"getFeature", value:function getFeature($features$jscomp$2_geojsonObject$$) {
      this.markers.clear();
      this.selectedPoint = null;
      var $_this$$ = this;
      $features$jscomp$2_geojsonObject$$ = (new $_GeoJSON$$.default).readFeatures($features$jscomp$2_geojsonObject$$);
      (0, $_underscore$$.default)($features$jscomp$2_geojsonObject$$).each(function($feature$$) {
        $_this$$.markers.set($feature$$.getId(), $feature$$);
      });
      return $features$jscomp$2_geojsonObject$$;
    }}, {key:"getSelectFeature", value:function getSelectFeature($layer$$) {
      var $_this$$ = this;
      this.select || (this.select = new $_Select$$.default({condition:$_condition$$.singleclick, layers:[$layer$$], hitTolerance:10, style:function style($feature$$) {
        return $_this$$.styleSelected($feature$$.get("icon"), $feature$$.get("name"), $feature$$.get("category_color_selected"));
      }}), this.select.on("select", function($evt$$) {
        0 < $evt$$.selected.length && (window.onPointSelected($evt$$.selected[0].getId()), this.selectedPoint = $evt$$.selected[0].getId());
      }));
      return this.select;
    }}, {key:"selectPoint", value:function selectPoint($id$$, $map$$) {
      if (this.markers && this.markers.has($id$$)) {
        var $features$$ = this.select.getFeatures();
        $features$$.clear();
        $features$$.push(this.markers.get($id$$));
        this.selectedPoint = $id$$;
        $map$$.getView().animate({zoom:$map$$.getView().getZoomForResolution($map$$.getView().getResolution())}, {center:this.markers.get($id$$).getGeometry().getCoordinates()});
      }
    }}, {key:"clearSelectedPoint", value:function clearSelectedPoint() {
      this.markers && (this.select.getFeatures().clear(), this.selectedPoint = null);
    }}]);
    return $Markers$$;
  }();
  $exports$$.default = $Markers___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 226:function($module$$, $exports$$, $Label___webpack_require__$$) {
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $Label___webpack_require__$$(71);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  var $_style$$ = $Label___webpack_require__$$(75), $_GeoJSON$$ = function _interopRequireDefault($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }($Label___webpack_require__$$(136));
  $Label___webpack_require__$$ = function() {
    function $Label$$() {
      if (!(this instanceof $Label$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.name = "Label";
      this.geojsonObject = {type:"FeatureCollection", features:[{type:"Feature", id:"483167828", geometry:{type:"LineString", coordinates:[[1135.142802328573, 684.9411306009466], [1139.4677224112374, 699.9899231562404], [1149.1385009603925, 713.937388478588], [1161.3174116020969, 723.4715059842388], [1173.1908446171442, 733.0779734540978], [1189.340964405384, 742.3186716604602], [1205.6518618918644, 746.7079028224208], [1220.8413349331186, 750.4861787310683], [1237.5220211255514, 751.7362253348867], 
      [1253.4309743664307, 749.8752234777551]]}, properties:{highway:"primary", is_in:"Austria,Vienna,Wien", lanes:"4", maxspeed:"50", name:"Handelskai", ref:"B14", "source:maxspeed":"AT:urban"}}]};
    }
    $_createClass$$($Label$$, [{key:"toString", value:function toString() {
      return this.name;
    }}, {key:"style", value:function style() {
      return new $_style$$.Style({text:new $_style$$.Text({font:'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"', placement:"line", fill:new $_style$$.Fill({color:"red"})})});
    }}, {key:"getFeature", value:function getFeature() {
      return (new $_GeoJSON$$.default).readFeatures(this.geojsonObject);
    }}]);
    return $Label$$;
  }();
  $exports$$.default = $Label___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 227:function($module$$, $exports$$, $CurrentPosition___webpack_require__$$) {
  function $_interopRequireDefault$$($obj$$) {
    return $obj$$ && $obj$$.__esModule ? $obj$$ : {default:$obj$$};
  }
  function $_defineProperties$$($target$$, $props$$) {
    for (var $i$$ = 0; $i$$ < $props$$.length; $i$$++) {
      var $descriptor$$ = $props$$[$i$$];
      $descriptor$$.enumerable = $descriptor$$.enumerable || !1;
      $descriptor$$.configurable = !0;
      "value" in $descriptor$$ && ($descriptor$$.writable = !0);
      Object.defineProperty($target$$, $descriptor$$.key, $descriptor$$);
    }
  }
  function $_createClass$$($Constructor$$, $protoProps$$, $staticProps$$) {
    $protoProps$$ && $_defineProperties$$($Constructor$$.prototype, $protoProps$$);
    $staticProps$$ && $_defineProperties$$($Constructor$$, $staticProps$$);
    return $Constructor$$;
  }
  $CurrentPosition___webpack_require__$$(71);
  Object.defineProperty($exports$$, "__esModule", {value:!0});
  $exports$$.default = void 0;
  var $_style$$ = $CurrentPosition___webpack_require__$$(75);
  $_interopRequireDefault$$($CurrentPosition___webpack_require__$$(87));
  $_interopRequireDefault$$($CurrentPosition___webpack_require__$$(48));
  var $_Overlay$$ = $_interopRequireDefault$$($CurrentPosition___webpack_require__$$(137));
  $CurrentPosition___webpack_require__$$ = function() {
    function $CurrentPosition$$() {
      if (!(this instanceof $CurrentPosition$$)) {
        throw new TypeError("Cannot call a class as a function");
      }
      this.name = "CurrentPosition";
      this.positionFeature;
      this.whereAmI = new $_Overlay$$.default({positioning:"center-center", element:document.getElementById("marker"), stopEvent:!1});
      this.overlayDisabled;
    }
    $_createClass$$($CurrentPosition$$, [{key:"toString", value:function toString() {
      return this.name;
    }}, {key:"style", value:function style() {
      return new $_style$$.Style({image:new $_style$$.Circle({radius:8, fill:new $_style$$.Fill({color:"#4285F4"}), stroke:new $_style$$.Stroke({color:"#DCE8FD", width:8})})});
    }}, {key:"init", value:function init($map$$, $coordinates$$) {
      $map$$.addOverlay(this.whereAmI);
      $coordinates$$ && this.whereAmI.setPosition($coordinates$$);
    }}, {key:"setCurrentPoint", value:function setCurrentPoint($coordinates$$, $map$$) {
      this.overlayDisabled && this.whereAmI && ($map$$.addOverlay(this.whereAmI), this.overlayDisabled = !1);
      this.whereAmI.setPosition($coordinates$$ ? $coordinates$$ : null);
    }}, {key:"removeCurrentPoint", value:function removeCurrentPoint($map$$) {
      null != this.whereAmI && ($map$$.removeOverlay(this.whereAmI), this.overlayDisabled = !0);
    }}]);
    return $CurrentPosition$$;
  }();
  $exports$$.default = $CurrentPosition___webpack_require__$$;
  $module$$.exports = $exports$$.default;
}, 228:function($module$$) {
  $module$$.exports = JSON.parse('{"user_details":{"full_name":"Renjith Raj","address":"Jio 22 B","username":"reliance","email":"renjith@sayonetech.com","latitude":0,"longitude":0,"image":null,"map_bg_color":"#c1d1a3"},"floors":[{"id":5,"name":5,"class":"current","image":"https://becomaps-web-staging.s3.amazonaws.com/media/floor-image/final-all-chair.svg","label":"5","description":"Fifth floor"},{"id":6,"name":6,"class":"","image":"https://beco-maps-web.s3.amazonaws.com/media/floor-image/1-as.svg","label":"6","description":"Fifth floor"}],"points":[{"id":19,"name":"5B HR","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":18,"name":"Snacks Area","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":17,"name":"5B Conference room","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":16,"name":"5B Passage","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":15,"name":"5B Right corner","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":14,"name":"5B W101","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":13,"name":"5B W5","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":12,"name":"5B W4","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":11,"name":"Washroom","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":10,"name":"5B W3","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":9,"name":"5B W2","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":8,"name":"5B W1","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":7,"name":"Lift Passage","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":6,"name":"5B Window","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":5,"name":"Pantry ","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"},{"id":4,"name":"Lift 1","popular":false,"description":null,"category":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3"}],"edges":[[{"id":"618","start_id":777,"end_id":776,"cost":4.44},{"id":"620","start_id":773,"end_id":777,"cost":3.08},{"id":"621","start_id":774,"end_id":777,"cost":10.26}],[{"id":"650","start_id":729,"end_id":762,"cost":15.75},{"id":"651","start_id":762,"end_id":761,"cost":8.31}],[{"id":"564","start_id":728,"end_id":727,"cost":3.33},{"id":"598","start_id":727,"end_id":741,"cost":3.49},{"id":"629","start_id":727,"end_id":726,"cost":6.31}],[{"id":"610","start_id":766,"end_id":729,"cost":3.76},{"id":"611","start_id":729,"end_id":734,"cost":3.17},{"id":"613","start_id":730,"end_id":729,"cost":4.21},{"id":"650","start_id":729,"end_id":762,"cost":15.75}],[{"id":"602","start_id":737,"end_id":732,"cost":3.19},{"id":"607","start_id":732,"end_id":767,"cost":3.71},{"id":"646","start_id":732,"end_id":730,"cost":6.17}],[{"id":"563","start_id":747,"end_id":728,"cost":3.23},{"id":"568","start_id":731,"end_id":747,"cost":3.06},{"id":"627","start_id":747,"end_id":744,"cost":6.4}],[{"id":"584","start_id":743,"end_id":751,"cost":2.46},{"id":"585","start_id":751,"end_id":758,"cost":2.55},{"id":"635","start_id":751,"end_id":750,"cost":1.02}],[{"id":"576","start_id":752,"end_id":771,"cost":6.74},{"id":"577","start_id":758,"end_id":752,"cost":6.46},{"id":"614","start_id":763,"end_id":752,"cost":2.15}],[{"id":"614","start_id":763,"end_id":752,"cost":2.15}],[{"id":"573","start_id":774,"end_id":772,"cost":3.07},{"id":"578","start_id":772,"end_id":771,"cost":3.02},{"id":"622","start_id":772,"end_id":773,"cost":10.25}],[{"id":"620","start_id":773,"end_id":777,"cost":3.08},{"id":"622","start_id":772,"end_id":773,"cost":10.25},{"id":"637","start_id":778,"end_id":773,"cost":3.1}],[{"id":"640","start_id":770,"end_id":761,"cost":3.74},{"id":"651","start_id":762,"end_id":761,"cost":8.31},{"id":"652","start_id":761,"end_id":768,"cost":4.36}],[{"id":"641","start_id":768,"end_id":769,"cost":11.13},{"id":"643","start_id":768,"end_id":780,"cost":5.92},{"id":"652","start_id":761,"end_id":768,"cost":4.36}],[{"id":"573","start_id":774,"end_id":772,"cost":3.07},{"id":"574","start_id":775,"end_id":774,"cost":4.51},{"id":"621","start_id":774,"end_id":777,"cost":10.26}],[{"id":"630","start_id":780,"end_id":779,"cost":3.74},{"id":"643","start_id":768,"end_id":780,"cost":5.92}],[{"id":"599","start_id":741,"end_id":739,"cost":3.64},{"id":"600","start_id":739,"end_id":735,"cost":3.17},{"id":"644","start_id":739,"end_id":740,"cost":6.3}],[{"id":"572","start_id":760,"end_id":759,"cost":5.68},{"id":"581","start_id":759,"end_id":754,"cost":5.11}],[{"id":"634","start_id":757,"end_id":758,"cost":1.06},{"id":"636","start_id":750,"end_id":757,"cost":2.54},{"id":"638","start_id":757,"end_id":756,"cost":3.4}],[{"id":"587","start_id":736,"end_id":740,"cost":3.21},{"id":"628","start_id":740,"end_id":742,"cost":3.63},{"id":"644","start_id":739,"end_id":740,"cost":6.3},{"id":"645","start_id":740,"end_id":764,"cost":4.18}],[{"id":"565","start_id":760,"end_id":745,"cost":5.85},{"id":"572","start_id":760,"end_id":759,"cost":5.68}],[{"id":"567","start_id":745,"end_id":744,"cost":3.04},{"id":"569","start_id":744,"end_id":725,"cost":3.21},{"id":"625","start_id":744,"end_id":748,"cost":6.71},{"id":"627","start_id":747,"end_id":744,"cost":6.4}],[{"id":"623","start_id":725,"end_id":756,"cost":6.74},{"id":"624","start_id":756,"end_id":749,"cost":0.74},{"id":"638","start_id":757,"end_id":756,"cost":3.4}],[{"id":"593","start_id":764,"end_id":743,"cost":3.63},{"id":"594","start_id":738,"end_id":764,"cost":3.23},{"id":"645","start_id":740,"end_id":764,"cost":4.18}],[{"id":"615","start_id":749,"end_id":748,"cost":2.46},{"id":"617","start_id":749,"end_id":755,"cost":4.82},{"id":"624","start_id":756,"end_id":749,"cost":0.74}],[{"id":"635","start_id":751,"end_id":750,"cost":1.02},{"id":"636","start_id":750,"end_id":757,"cost":2.54},{"id":"639","start_id":726,"end_id":750,"cost":4.25}],[{"id":"583","start_id":741,"end_id":742,"cost":6.3},{"id":"591","start_id":742,"end_id":726,"cost":3.49},{"id":"592","start_id":742,"end_id":743,"cost":4.21},{"id":"628","start_id":740,"end_id":742,"cost":3.63}],[{"id":"584","start_id":743,"end_id":751,"cost":2.46},{"id":"592","start_id":742,"end_id":743,"cost":4.21},{"id":"593","start_id":764,"end_id":743,"cost":3.63}],[{"id":"571","start_id":746,"end_id":745,"cost":6.71},{"id":"579","start_id":753,"end_id":746,"cost":4.13},{"id":"616","start_id":748,"end_id":746,"cost":3}],[{"id":"577","start_id":758,"end_id":752,"cost":6.46},{"id":"585","start_id":751,"end_id":758,"cost":2.55},{"id":"634","start_id":757,"end_id":758,"cost":1.06}],[{"id":"617","start_id":749,"end_id":755,"cost":4.82}],[{"id":"601","start_id":735,"end_id":737,"cost":3.3},{"id":"602","start_id":737,"end_id":732,"cost":3.19},{"id":"604","start_id":737,"end_id":733,"cost":6.21}],[{"id":"615","start_id":749,"end_id":748,"cost":2.46},{"id":"616","start_id":748,"end_id":746,"cost":3},{"id":"625","start_id":744,"end_id":748,"cost":6.71}],[{"id":"569","start_id":744,"end_id":725,"cost":3.21},{"id":"570","start_id":725,"end_id":726,"cost":3.37},{"id":"623","start_id":725,"end_id":756,"cost":6.74},{"id":"626","start_id":728,"end_id":725,"cost":6.35}],[{"id":"605","start_id":767,"end_id":765,"cost":6.18},{"id":"607","start_id":732,"end_id":767,"cost":3.71}],[{"id":"570","start_id":725,"end_id":726,"cost":3.37},{"id":"591","start_id":742,"end_id":726,"cost":3.49},{"id":"629","start_id":727,"end_id":726,"cost":6.31},{"id":"639","start_id":726,"end_id":750,"cost":4.25}],[{"id":"575","start_id":771,"end_id":770,"cost":3.68},{"id":"576","start_id":752,"end_id":771,"cost":6.74},{"id":"578","start_id":772,"end_id":771,"cost":3.02},{"id":"649","start_id":771,"end_id":778,"cost":10.23}],[{"id":"563","start_id":747,"end_id":728,"cost":3.23},{"id":"564","start_id":728,"end_id":727,"cost":3.33},{"id":"626","start_id":728,"end_id":725,"cost":6.35}],[{"id":"589","start_id":735,"end_id":736,"cost":6.23},{"id":"600","start_id":739,"end_id":735,"cost":3.17},{"id":"601","start_id":735,"end_id":737,"cost":3.3}],[{"id":"580","start_id":754,"end_id":753,"cost":5.76},{"id":"581","start_id":759,"end_id":754,"cost":5.11}],[{"id":"609","start_id":765,"end_id":766,"cost":4.16},{"id":"610","start_id":766,"end_id":729,"cost":3.76}],[{"id":"574","start_id":775,"end_id":774,"cost":4.51},{"id":"582","start_id":753,"end_id":775,"cost":9.03},{"id":"619","start_id":775,"end_id":776,"cost":10.28}],[{"id":"603","start_id":730,"end_id":733,"cost":3.18},{"id":"606","start_id":765,"end_id":730,"cost":3.75},{"id":"613","start_id":730,"end_id":729,"cost":4.21},{"id":"646","start_id":732,"end_id":730,"cost":6.17}],[{"id":"588","start_id":733,"end_id":736,"cost":3.28},{"id":"603","start_id":730,"end_id":733,"cost":3.18},{"id":"604","start_id":737,"end_id":733,"cost":6.21},{"id":"612","start_id":733,"end_id":734,"cost":4.2}],[{"id":"605","start_id":767,"end_id":765,"cost":6.18},{"id":"606","start_id":765,"end_id":730,"cost":3.75},{"id":"609","start_id":765,"end_id":766,"cost":4.16}],[{"id":"596","start_id":734,"end_id":738,"cost":3.27},{"id":"611","start_id":729,"end_id":734,"cost":3.17},{"id":"612","start_id":733,"end_id":734,"cost":4.2}],[{"id":"587","start_id":736,"end_id":740,"cost":3.21},{"id":"588","start_id":733,"end_id":736,"cost":3.28},{"id":"589","start_id":735,"end_id":736,"cost":6.23},{"id":"647","start_id":736,"end_id":738,"cost":4.22}],[{"id":"594","start_id":738,"end_id":764,"cost":3.23},{"id":"596","start_id":734,"end_id":738,"cost":3.27},{"id":"647","start_id":736,"end_id":738,"cost":4.22}],[{"id":"618","start_id":777,"end_id":776,"cost":4.44},{"id":"619","start_id":775,"end_id":776,"cost":10.28}],[{"id":"631","start_id":779,"end_id":778,"cost":3.58},{"id":"637","start_id":778,"end_id":773,"cost":3.1},{"id":"649","start_id":771,"end_id":778,"cost":10.23}],[{"id":"641","start_id":768,"end_id":769,"cost":11.13}],[{"id":"575","start_id":771,"end_id":770,"cost":3.68},{"id":"640","start_id":770,"end_id":761,"cost":3.74},{"id":"648","start_id":770,"end_id":779,"cost":10.26}],[{"id":"630","start_id":780,"end_id":779,"cost":3.74},{"id":"631","start_id":779,"end_id":778,"cost":3.58},{"id":"648","start_id":770,"end_id":779,"cost":10.26}],[{"id":"566","start_id":745,"end_id":731,"cost":6.4},{"id":"568","start_id":731,"end_id":747,"cost":3.06}],[{"id":"565","start_id":760,"end_id":745,"cost":5.85},{"id":"566","start_id":745,"end_id":731,"cost":6.4},{"id":"567","start_id":745,"end_id":744,"cost":3.04},{"id":"571","start_id":746,"end_id":745,"cost":6.71}],[{"id":"579","start_id":753,"end_id":746,"cost":4.13},{"id":"580","start_id":754,"end_id":753,"cost":5.76},{"id":"582","start_id":753,"end_id":775,"cost":9.03}],[{"id":"583","start_id":741,"end_id":742,"cost":6.3},{"id":"598","start_id":727,"end_id":741,"cost":3.49},{"id":"599","start_id":741,"end_id":739,"cost":3.64}]],"nodes":[{"id":"777","x":1551.8148146451,"y":90.1523669164,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"762","x":938.387298584,"y":380.0994873047,"step":false,"point_id":17,"point_name":"5B Conference room","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":26},{"id":"727","x":1406.7820183723,"y":1112.7207306594,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"729","x":938.2362683688,"y":820.9740542819,"step":false,"point_id":16,"point_name":"5B Passage","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":22},{"id":"732","x":936.8010985603,"y":1111.6790139296,"step":false,"point_id":15,"point_name":"5B Right corner","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":21},{"id":"747","x":1590.469554842,"y":1113.1278756556,"step":false,"point_id":14,"point_name":"5B W101","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":25},{"id":"751","x":1379.6844482422,"y":817.5407409668,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"752","x":1379.2721083657,"y":565.5216628501,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"763","x":1318.9727783203,"y":565.8714294434,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":28},{"id":"772","x":1463.4434053855,"y":377.1306513011,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"773","x":1465.5784966587,"y":90.2326396578,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"761","x":1171.055019469,"y":378.4016356758,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"768","x":1172.8584949519,"y":256.2974881127,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"774","x":1549.5176299839,"y":377.3814882212,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"780","x":1173.978805542,"y":90.5040740967,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"739","x":1207.2976129537,"y":1112.2785717681,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"759","x":1840.3591000165,"y":774.3028245803,"step":false,"point_id":4,"point_name":"Lift 1","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":12},{"id":"757","x":1409.1751098633,"y":746.1772918701,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"740","x":1208.3397583196,"y":935.9595915256,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"760","x":1840.8004760742,"y":933.3190917969,"step":false,"point_id":7,"point_name":"Lift Passage","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":13},{"id":"744","x":1591.8981472956,"y":934.0152614884,"step":false,"point_id":8,"point_name":"5B W1","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":14},{"id":"756","x":1504.3427944949,"y":746.2249342437,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"764","x":1209.143380767,"y":818.8671048402,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"749","x":1525.07417745,"y":746.2353126857,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"750","x":1408.2939147949,"y":817.2229766846,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"742","x":1309.8714788593,"y":935.9856208391,"step":false,"point_id":9,"point_name":"5B W2","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":15},{"id":"743","x":1310.8167512602,"y":818.0763516949,"step":false,"point_id":10,"point_name":"5B W3","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":16},{"id":"746","x":1677.9829244636,"y":746.3118611031,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"758","x":1379.5678311538,"y":746.2652403956,"step":false,"point_id":11,"point_name":"Washroom","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":17},{"id":"755","x":1523.8746643066,"y":611.3464355469,"step":false,"point_id":5,"point_name":"Pantry ","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":27},{"id":"737","x":1026.1114129388,"y":1111.8769710056,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"748","x":1593.9506246324,"y":746.2697932705,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"725","x":1501.943847562,"y":935.0209597412,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"767","x":832.8788757324,"y":1111.4486694336,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"726","x":1407.6855184688,"y":936.1330721286,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"771","x":1378.963470459,"y":376.8844604492,"step":false,"point_id":12,"point_name":"5B W4","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":18},{"id":"728","x":1500.0391464092,"y":1112.9274358816,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"735","x":1118.5099541768,"y":1112.0817731627,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"754","x":1839.9620056152,"y":631.2400817871,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"766","x":833.0871582031,"y":821.7918395996,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"775","x":1675.8460998535,"y":377.7496337891,"step":false,"point_id":13,"point_name":"5B W5","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":19},{"id":"730","x":937.6538670461,"y":938.9440338671,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"733","x":1026.6478857777,"y":937.9586822504,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"765","x":832.740020752,"y":938.3819580078,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"734","x":1027.01086931,"y":820.2836198587,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"736","x":1118.5525626535,"y":937.7623110697,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"738","x":1118.5814517569,"y":819.5714400054,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"776","x":1675.9956359863,"y":90.0367736816,"step":false,"point_id":6,"point_name":"5B Window","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":20},{"id":"778","x":1378.8969614671,"y":90.3133268279,"step":false,"point_id":19,"point_name":"5B HR","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":24},{"id":"769","x":861.3040924072,"y":256.3343048096,"step":false,"point_id":18,"point_name":"Snacks Area","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"Room","category_image_url":"https://becomaps-web-staging.s3.amazonaws.com/media/category-image/marker_destination.png","category_text_color":"#2110e3","beacon":23},{"id":"770","x":1275.9004407902,"y":377.6365447183,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"779","x":1278.7232843437,"y":90.4065731058,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"731","x":1676.1878967285,"y":1113.3178710938,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"745","x":1676.9116554233,"y":934.1422043077,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"753","x":1678.5484313965,"y":630.6900024414,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null},{"id":"741","x":1309.1834744797,"y":1112.5044026518,"step":false,"point_id":null,"point_name":"","point_popular":false,"floor_id":5,"floor_description":"Fifth floor","category_name":"","category_image_url":"","category_text_color":"","beacon":null}]}');
}});
}).call(this || window)

//# sourceMappingURL=app.a2747ec5.js.map