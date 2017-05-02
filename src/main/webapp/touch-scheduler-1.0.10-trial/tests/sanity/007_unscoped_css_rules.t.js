StartTest(function(t) {

    var CSS2 = (function() {
        var CSS,
            rules = null,
            doc = document,
            camelRe = /(-[a-z])/gi,
            camelFn = function(m, a){ return a.charAt(1).toUpperCase(); };

        return CSS = {

            singleton: true,

            rules: rules,

            initialized: false,

            constructor: function() {

                CSS = this;
            },


            createStyleSheet : function(cssText, id) {
                var ss,
                    head = doc.getElementsByTagName("head")[0],
                    styleEl = doc.createElement("style");

                styleEl.setAttribute("type", "text/css");
                if (id) {
                    styleEl.setAttribute("id", id);
                }

                if (Ext.isIE) {
                    head.appendChild(styleEl);
                    ss = styleEl.styleSheet;
                    ss.cssText = cssText;
                } else {
                    try{
                        styleEl.appendChild(doc.createTextNode(cssText));
                    } catch(e) {
                        styleEl.cssText = cssText;
                    }
                    head.appendChild(styleEl);
                    ss = styleEl.styleSheet ? styleEl.styleSheet : (styleEl.sheet || doc.styleSheets[doc.styleSheets.length-1]);
                }
                CSS.cacheStyleSheet(ss);
                return ss;
            },


            removeStyleSheet : function(id) {
                var existing = doc.getElementById(id);
                if (existing) {
                    existing.parentNode.removeChild(existing);
                }
            },


            swapStyleSheet : function(id, url) {
                var ss;
                CSS.removeStyleSheet(id);
                ss = doc.createElement("link");
                ss.setAttribute("rel", "stylesheet");
                ss.setAttribute("type", "text/css");
                ss.setAttribute("id", id);
                ss.setAttribute("href", url);
                doc.getElementsByTagName("head")[0].appendChild(ss);
            },


            refreshCache : function() {
                return CSS.getRules(true);
            },


            cacheStyleSheet : function(ss) {
                if (!rules) {
                    rules = CSS.rules = {};
                }
                try {
                    var ssRules = ss.cssRules || ss.rules,
                        i = ssRules.length - 1,
                        imports = ss.imports,
                        len = imports ? imports.length : 0,
                        rule, j;


                    for (j = 0; j < len; ++j) {
                        CSS.cacheStyleSheet(imports[j]);
                    }

                    for (; i >= 0; --i) {
                        rule = ssRules[i];

                        if (rule.styleSheet) {
                            CSS.cacheStyleSheet(rule.styleSheet);
                        }
                        CSS.cacheRule(rule, ss);
                    }
                } catch(e) {}
            },

            cacheRule: function(cssRule, styleSheet) {

                if (cssRule.styleSheet) {
                    return CSS.cacheStyleSheet(cssRule.styleSheet);
                }

                var selectorText = cssRule.selectorText,
                    selectorCount, j;

                if (selectorText) {


                    selectorText = selectorText.split(',');
                    selectorCount = selectorText.length;
                    for (j = 0; j < selectorCount; j++) {


                        rules[Ext.String.trim(selectorText[j]).toLowerCase()] = {
                            parentStyleSheet: styleSheet,
                            cssRule: cssRule
                        };
                    };
                }
            },


            getRules : function(refreshCache) {
                var result = {},
                    selector;

                if (rules === null || refreshCache) {
                    CSS.refreshCache();
                }
                for (selector in rules) {
                    result[selector] = rules[selector].cssRule;
                }
                return result;
            },

            refreshCache: function() {
                var ds = doc.styleSheets,
                    i = 0,
                    len = ds.length;

                rules = CSS.rules = {}
                for (; i < len; i++) {
                    try {
                        if (!ds[i].disabled) {
                            CSS.cacheStyleSheet(ds[i]);
                        }
                    } catch(e) {}
                }
            },


            getRule: function(selector, refreshCache, rawCache) {
                var i, result;

                if (!rules || refreshCache) {
                    CSS.refreshCache();
                }
                if (!Ext.isArray(selector)) {
                    result = rules[selector.toLowerCase()]
                    if (result && !rawCache) {
                        result = result.cssRule;
                    }
                    return result || null;
                }
                for (i = 0; i < selector.length; i++) {
                    if (rules[selector[i]]) {
                        return rawCache ? rules[selector[i].toLowerCase()] : rules[selector[i].toLowerCase()].cssRule;
                    }
                }
                return null;
            },


            createRule: function(styleSheet, selector, cssText) {
                var result,
                    ruleSet = styleSheet.cssRules || styleSheet.rules,
                    index = ruleSet.length;

                if (styleSheet.insertRule) {
                    styleSheet.insertRule(selector + '{' + cssText + '}', index);
                } else {
                    styleSheet.addRule(selector, cssText||' ');
                }
                CSS.cacheRule(result = ruleSet[index], styleSheet);
                return result;
            },


            updateRule : function(selector, property, value) {
                var rule, i, styles;
                if (!Ext.isArray(selector)) {
                    rule = CSS.getRule(selector);
                    if (rule) {

                        if (arguments.length == 2) {
                            styles = Ext.Element.parseStyles(property);
                            for (property in styles) {
                                rule.style[property.replace(camelRe, camelFn)] = styles[property];
                            }
                        } else {
                            rule.style[property.replace(camelRe, camelFn)] = value;
                        }
                        return true;
                    }
                } else {
                    for (i = 0; i < selector.length; i++) {
                        if (CSS.updateRule(selector[i], property, value)) {
                            return true;
                        }
                    }
                }
                return false;
            },

            deleteRule: function(selector) {
                var rule = CSS.getRule(selector, false, true),
                    styleSheet, index;

                if (rule) {
                    styleSheet = rule.parentStyleSheet;
                    index = Ext.Array.indexOf(styleSheet.cssRules || styleSheet.rules, rule.cssRule);
                    if (styleSheet.deleteRule) {
                        styleSheet.deleteRule(index);
                    } else {
                        styleSheet.removeRule(index);
                    }
                    delete rules[selector];
                }
            }
        };
    }());

    var isGarbageBrowser = !Object.keys || ![].forEach;
    var found = 0;
    var scopingRe = /sch-|ubergrid-/;
    var rules = Object.keys(CSS2.getRules());

    if (isGarbageBrowser) return;

    rules.forEach(function(rule) {
        if (!rule.match(scopingRe)) {
            t.fail('Found unscoped rule: ' + rule);
            found++;
        }
    });

    t.is(found, 0, rules.length + ' CSS rules found. Should find only scoped rules with either "sch-xxx", "ug" or "ubergrid-xxx"');
})
