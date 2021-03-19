! function(h) {
    var u, o, t, i, n;

    function e(e) {
        this.initialise.apply(this, arguments)
    }

    function s(e) {
        u.deepExtend(this.options = {}, i), u.isPlainObject(e) && u.deepExtend(this.options, e), this.currentServiceIndex = -1
    }

    function r(e) {
        return new Error("Error [" + (e.code || "UNKNOWN") + "]: " + e.error)
    }

    function a() {
        this.initialise.apply(this, arguments)
    }

    function c(e) {
        this.openingTimeout = null, u.removeClass(e, "cc-invisible")
    }

    function l(e) {
        e.style.display = "none", e.removeEventListener(h.transitionEnd, this.afterTransition), this.afterTransition = null
    }

    function p() {
        var e = this.options.position.split("-"),
            t = [];
        return e.forEach(function(e) {
            t.push("cc-" + e)
        }), t
    }

    function d(e) {
        var t = this.options,
            i = document.createElement("div"),
            n = t.container && 1 === t.container.nodeType ? t.container : document.body;
        return i.innerHTML = e, (i = i.children[0]).id = "cookie-consent", i.style.display = "none", u.hasClass(i, "cc-window") && h.hasTransition && u.addClass(i, "cc-invisible"), this.onButtonClick = function(e) {
            var t = u.traverseDOMPath(e.target, "cc-btn") || e.target;
            !u.hasClass(t, "cc-btn") || (e = (e = t.className.match(new RegExp("\\bcc-(" + o.join("|") + ")\\b"))) && e[1] || !1) && (this.setStatus(e), this.close(!0)), u.hasClass(t, "cc-close") && (this.setStatus(h.status.dismiss), this.close(!0)), u.hasClass(t, "cc-revoke") && this.revokeChoice()
        }.bind(this), i.addEventListener("click", this.onButtonClick), t.autoAttach && (n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i)), i
    }

    function f(e, t) {
        for (var i = 0, n = e.length; i < n; ++i) {
            var o = e[i];
            if (o instanceof RegExp && o.test(t) || "string" == typeof o && o.length && o === t) return 1
        }
    }
    h.hasInitialised || (u = {
        escapeRegExp: function(e) {
            return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        },
        hasClass: function(e, t) {
            var i = " ";
            return 1 === e.nodeType && 0 <= (i + e.className + i).replace(/[\n\t]/g, i).indexOf(i + t + i)
        },
        addClass: function(e, t) {
            e.className += " " + t
        },
        removeClass: function(e, t) {
            t = new RegExp("\\b" + this.escapeRegExp(t) + "\\b"), e.className = e.className.replace(t, "")
        },
        interpolateString: function(e, t) {
            return e.replace(/{{([a-z][a-z0-9\-_]*)}}/gi, function(e) {
                return t(arguments[1]) || ""
            })
        },
        getCookie: function(e) {
            return (e = ("; " + document.cookie).split("; " + e + "=")).length < 2 ? void 0 : e.pop().split(";").shift()
        },
        setCookie: function(e, t, i, n, o, s) {
            var r = new Date;
            r.setHours(r.getHours() + 24 * (i || 365)), o = [e + "=" + t, "expires=" + r.toUTCString(), "path=" + (o || "/")], n && o.push("domain=" + n), s && o.push("secure"), document.cookie = o.join(";")
        },
        deepExtend: function(e, t) {
            for (var i in t) t.hasOwnProperty(i) && (i in e && this.isPlainObject(e[i]) && this.isPlainObject(t[i]) ? this.deepExtend(e[i], t[i]) : e[i] = t[i]);
            return e
        },
        throttle: function(e, t) {
            var i = !1;
            return function() {
                i || (e.apply(this, arguments), i = !0, setTimeout(function() {
                    i = !1
                }, t))
            }
        },
        hash: function(e) {
            var t, i, n = 0;
            if (0 === e.length) return n;
            for (t = 0, i = e.length; t < i; ++t) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
            return n
        },
        normaliseHex: function(e) {
            return "#" == e[0] && (e = e.substr(1)), 3 == e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), e
        },
        getContrast: function(e) {
            return e = this.normaliseHex(e), 128 <= (299 * parseInt(e.substr(0, 2), 16) + 587 * parseInt(e.substr(2, 2), 16) + 114 * parseInt(e.substr(4, 2), 16)) / 1e3 ? "#000" : "#fff"
        },
        getLuminance: function(e) {
            var t = parseInt(this.normaliseHex(e), 16),
                i = 38 + (t >> 16);
            return "#" + (16777216 + 65536 * (i < 255 ? i < 1 ? 0 : i : 255) + 256 * ((e = 38 + (t >> 8 & 255)) < 255 ? e < 1 ? 0 : e : 255) + ((t = 38 + (255 & t)) < 255 ? t < 1 ? 0 : t : 255)).toString(16).slice(1)
        },
        isMobile: function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
        isPlainObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor == Object
        },
        traverseDOMPath: function(e, t) {
            return e && e.parentNode ? u.hasClass(e, t) ? e : this.traverseDOMPath(e.parentNode, t) : null
        }
    }, h.status = {
        deny: "deny",
        allow: "allow",
        dismiss: "dismiss"
    }, h.transitionEnd = function() {
        var e, t = document.createElement("div"),
            i = {
                t: "transitionend",
                OT: "oTransitionEnd",
                msT: "MSTransitionEnd",
                MozT: "transitionend",
                WebkitT: "webkitTransitionEnd"
            };
        for (e in i)
            if (i.hasOwnProperty(e) && void 0 !== t.style[e + "ransition"]) return i[e];
        return ""
    }(), h.hasTransition = !!h.transitionEnd, o = Object.keys(h.status).map(u.escapeRegExp), h.customStyles = {}, h.Popup = (n = {
        enabled: !0,
        container: null,
        cookie: {
            name: "cookieconsent_status",
            path: "/",
            domain: "",
            expiryDays: 365,
            secure: !1
        },
        onPopupOpen: function() {},
        onPopupClose: function() {},
        onInitialise: function(e) {},
        onStatusChange: function(e, t) {},
        onRevokeChoice: function() {},
        onNoCookieLaw: function(e, t) {},
        content: {
            header: "Cookies dieser Webseite",
            message: "Yeah, if I could see who actually vists the site, that'd be great. Can we use some cookies for that?",
            dismiss: "Got it!",
            allow: "Ok",
            deny: "Nein danke",
            link: "Learn more",
            href: "/privacy",
            close: "&#x274c;",
            target: "_blank",
            policy: "Cookie Policy"
        },
        elements: {
            header: '<span class="cc-header">{{header}}</span>&nbsp;',
            message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
            messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a></span>',
            dismiss: '<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
            allow: '<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',
            deny: '<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
            link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>',
            close: '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>'
        },
        window: '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}">\x3c!--googleoff: all--\x3e{{children}}\x3c!--googleon: all--\x3e</div>',
        revokeBtn: '<div class="cc-revoke {{classes}}">{{policy}}</div>',
        compliance: {
            info: '<div class="cc-compliance">{{dismiss}}</div>',
            "opt-in": '<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>',
            "opt-out": '<div class="cc-compliance cc-highlight">{{deny}}{{allow}}</div>'
        },
        type: "info",
        layouts: {
            basic: "{{messagelink}}{{compliance}}",
            "basic-close": "{{messagelink}}{{compliance}}{{close}}",
            "basic-header": "{{header}}{{message}}{{link}}{{compliance}}"
        },
        layout: "basic",
        position: "bottom",
        theme: "block",
        static: !1,
        palette: null,
        revokable: !1,
        animateRevokable: !0,
        showLink: !0,
        dismissOnScroll: !1,
        dismissOnTimeout: !1,
        dismissOnWindowClick: !1,
        ignoreClicksFrom: ["cc-revoke", "cc-btn"],
        autoOpen: !0,
        autoAttach: !0,
        whitelistPage: [],
        blacklistPage: [],
        overrideHTML: null
    }, a.prototype.initialise = function(e) {
        this.options && this.destroy(), u.deepExtend(this.options = {}, n), u.isPlainObject(e) && u.deepExtend(this.options, e),
            function() {
                var e = this.options.onInitialise.bind(this);
                if (!window.navigator.cookieEnabled) return e(h.status.deny), !0;
                if (window.CookiesOK || window.navigator.CookiesOK) return e(h.status.allow), !0;
                var t = Object.keys(h.status),
                    i = this.getStatus();
                return (t = 0 <= t.indexOf(i)) && e(i), t
            }.call(this) && (this.options.enabled = !1), f(this.options.blacklistPage, location.pathname) && (this.options.enabled = !1), f(this.options.whitelistPage, location.pathname) && (this.options.enabled = !0);
        var t = this.options.window.replace("{{classes}}", function() {
            var e = this.options,
                t = "top" == e.position || "bottom" == e.position ? "banner" : "floating";
            return u.isMobile() && (t = "floating"), t = ["cc-" + t, "cc-type-" + e.type, "cc-theme-" + e.theme], e.static && t.push("cc-static"), t.push.apply(t, p.call(this)),
                function(e) {
                    var t = u.hash(JSON.stringify(e)),
                        i = "cc-color-override-" + t,
                        n = u.isPlainObject(e);
                    return this.customStyleSelector = n ? i : null, n && function(e, t, i) {
                        if (h.customStyles[e]) return ++h.customStyles[e].references;
                        var n = {},
                            o = t.popup,
                            s = t.button,
                            t = t.highlight;
                        o && (o.text = o.text || u.getContrast(o.background), o.link = o.link || o.text, n[i + ".cc-window"] = ["color: " + o.text, "background-color: " + o.background], n[i + ".cc-revoke"] = ["color: " + o.text, "background-color: " + o.background], n[i + " .cc-link," + i + " .cc-link:active," + i + " .cc-link:visited"] = ["color: " + o.link], s && (s.text = s.text || u.getContrast(s.background), s.border = s.border || "transparent", n[i + " .cc-btn"] = ["color: " + s.text, "border-color: " + s.border, "background-color: " + s.background], s.padding && n[i + " .cc-btn"].push("padding: " + s.padding), "transparent" != s.background && (n[i + " .cc-btn:hover, " + i + " .cc-btn:focus"] = ["background-color: " + (s.hover || (s = s.background, "000000" == (s = u.normaliseHex(s)) ? "#222" : u.getLuminance(s)))]), t ? (t.text = t.text || u.getContrast(t.background), t.border = t.border || "transparent", n[i + " .cc-highlight .cc-btn:first-child"] = ["color: " + t.text, "border-color: " + t.border, "background-color: " + t.background]) : n[i + " .cc-highlight .cc-btn:first-child"] = ["color: " + o.text]));
                        var r = document.createElement("style");
                        document.head.appendChild(r), h.customStyles[e] = {
                            references: 1,
                            element: r.sheet
                        };
                        var a, c = -1;
                        for (a in n) n.hasOwnProperty(a) && r.sheet.insertRule(a + "{" + n[a].join(";") + "}", ++c)
                    }(t, e, "." + i), n
                }.call(this, this.options.palette), this.customStyleSelector && t.push(this.customStyleSelector), t
        }.call(this).join(" ")).replace("{{children}}", function() {
            var t = {},
                i = this.options;
            i.showLink || (i.elements.link = "", i.elements.messagelink = i.elements.message), Object.keys(i.elements).forEach(function(e) {
                t[e] = u.interpolateString(i.elements[e], function(e) {
                    var t = i.content[e];
                    return e && "string" == typeof t && t.length ? t : ""
                })
            });
            var e = i.compliance[i.type] || i.compliance.info;
            return t.compliance = u.interpolateString(e, function(e) {
                return t[e]
            }), e = i.layouts[i.layout] || i.layouts.basic, u.interpolateString(e, function(e) {
                return t[e]
            })
        }.call(this));
        "string" == typeof(e = this.options.overrideHTML) && e.length && (t = e), this.options.static ? ((e = d.call(this, '<div class="cc-grower">' + t + "</div>")).style.display = "", this.element = e.firstChild, this.element.style.display = "none", u.addClass(this.element, "cc-invisible")) : this.element = d.call(this, t),
            function() {
                var r = this.setStatus.bind(this),
                    a = this.close.bind(this);
                "number" == typeof(e = this.options.dismissOnTimeout) && 0 <= e && (this.dismissTimeout = window.setTimeout(function() {
                    r(h.status.dismiss), a(!0)
                }, Math.floor(e)));
                var t, i = this.options.dismissOnScroll;
                "number" == typeof i && 0 <= i && (t = function(e) {
                    window.pageYOffset > Math.floor(i) && (r(h.status.dismiss), a(!0), window.removeEventListener("scroll", t), this.onWindowScroll = null)
                }, this.options.enabled && (this.onWindowScroll = t, window.addEventListener("scroll", t)));
                var c, e = this.options.dismissOnWindowClick,
                    l = this.options.ignoreClicksFrom;
                e && (c = function(e) {
                    for (var t = !1, i = e.path.length, n = l.length, o = 0; o < i; o++)
                        if (!t)
                            for (var s = 0; s < n; s++) t = t || u.hasClass(e.path[o], l[s]);
                    t || (r(h.status.dismiss), a(!0), window.removeEventListener("click", c), window.removeEventListener("touchend", c), this.onWindowClick = null)
                }.bind(this), this.options.enabled && (this.onWindowClick = c, window.addEventListener("click", c), window.addEventListener("touchend", c)))
            }.call(this),
            function() {
                var n, e;
                "info" != this.options.type && (this.options.revokable = !0), u.isMobile() && (this.options.animateRevokable = !1), this.options.revokable && (e = p.call(this), this.options.animateRevokable && e.push("cc-animate"), this.customStyleSelector && e.push(this.customStyleSelector), e = this.options.revokeBtn.replace("{{classes}}", e.join(" ")).replace("{{policy}}", this.options.content.policy), this.revokeBtn = d.call(this, e), n = this.revokeBtn, this.options.animateRevokable && (e = u.throttle(function(e) {
                    var t = !1,
                        i = window.innerHeight - 20;
                    u.hasClass(n, "cc-top") && e.clientY < 20 && (t = !0), u.hasClass(n, "cc-bottom") && e.clientY > i && (t = !0), t ? u.hasClass(n, "cc-active") || u.addClass(n, "cc-active") : u.hasClass(n, "cc-active") && u.removeClass(n, "cc-active")
                }, 200), this.onMouseMove = e, window.addEventListener("mousemove", e)))
            }.call(this), this.options.autoOpen && this.autoOpen()
    }, a.prototype.destroy = function() {
        var e, t;
        this.onButtonClick && this.element && (this.element.removeEventListener("click", this.onButtonClick), this.onButtonClick = null), this.dismissTimeout && (clearTimeout(this.dismissTimeout), this.dismissTimeout = null), this.onWindowScroll && (window.removeEventListener("scroll", this.onWindowScroll), this.onWindowScroll = null), this.onWindowClick && (window.removeEventListener("click", this.onWindowClick), this.onWindowClick = null), this.onMouseMove && (window.removeEventListener("mousemove", this.onMouseMove), this.onMouseMove = null), this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element), this.element = null, this.revokeBtn && this.revokeBtn.parentNode && this.revokeBtn.parentNode.removeChild(this.revokeBtn), this.revokeBtn = null, e = this.options.palette, u.isPlainObject(e) && (t = u.hash(JSON.stringify(e)), (e = h.customStyles[t]) && !--e.references && ((e = e.element.ownerNode) && e.parentNode && e.parentNode.removeChild(e), h.customStyles[t] = null)), this.options = null
    }, a.prototype.open = function(e) {
        if (this.element) return this.isOpen() || (h.hasTransition ? this.fadeIn() : this.element.style.display = "", this.options.revokable && this.toggleRevokeButton(), this.options.onPopupOpen.call(this)), this
    }, a.prototype.close = function(e) {
        if (this.element) return this.isOpen() && (h.hasTransition ? this.fadeOut() : this.element.style.display = "none", e && this.options.revokable && this.toggleRevokeButton(!0), this.options.onPopupClose.call(this)), this
    }, a.prototype.fadeIn = function() {
        var e, t = this.element;
        h.hasTransition && t && (this.afterTransition && l.call(this, t), u.hasClass(t, "cc-invisible")) && (t.style.display = "", this.options.static && (e = this.element.clientHeight, this.element.parentNode.style.maxHeight = e + "px"), this.openingTimeout = setTimeout(c.bind(this, t), 20))
    }, a.prototype.fadeOut = function() {
        var e = this.element;
        h.hasTransition && e && (this.openingTimeout && (clearTimeout(this.openingTimeout), c.bind(this, e)), u.hasClass(e, "cc-invisible") || (this.options.static && (this.element.parentNode.style.maxHeight = ""), this.afterTransition = l.bind(this, e), e.addEventListener(h.transitionEnd, this.afterTransition), u.addClass(e, "cc-invisible")))
    }, a.prototype.isOpen = function() {
        return this.element && "" == this.element.style.display && (!h.hasTransition || !u.hasClass(this.element, "cc-invisible"))
    }, a.prototype.toggleRevokeButton = function(e) {
        this.revokeBtn && (this.revokeBtn.style.display = e ? "" : "none")
    }, a.prototype.revokeChoice = function(e) {
        this.options.enabled = !0, this.clearStatus(), this.options.onRevokeChoice.call(this), e || this.autoOpen()
    }, a.prototype.hasAnswered = function(e) {
        return 0 <= Object.keys(h.status).indexOf(this.getStatus())
    }, a.prototype.hasConsented = function(e) {
        var t = this.getStatus();
        return t == h.status.allow || t == h.status.dismiss
    }, a.prototype.autoOpen = function(e) {
        !this.hasAnswered() && this.options.enabled ? this.open() : this.hasAnswered() && this.options.revokable && this.toggleRevokeButton(!0)
    }, a.prototype.setStatus = function(e) {
        var t = this.options.cookie,
            i = u.getCookie(t.name),
            i = 0 <= Object.keys(h.status).indexOf(i);
        0 <= Object.keys(h.status).indexOf(e) ? (u.setCookie(t.name, e, t.expiryDays, t.domain, t.path, t.secure), this.options.onStatusChange.call(this, e, i)) : this.clearStatus()
    }, a.prototype.getStatus = function() {
        return u.getCookie(this.options.cookie.name)
    }, a.prototype.clearStatus = function() {
        var e = this.options.cookie;
        u.setCookie(e.name, "", -1, e.domain, e.path)
    }, a), h.Location = (i = {
        timeout: 5e3,
        services: ["ipinfo"],
        serviceDefinitions: {
            ipinfo: function() {
                return {
                    url: "//ipinfo.io",
                    headers: ["Accept: application/json"],
                    callback: function(e, t) {
                        try {
                            var i = JSON.parse(t);
                            return i.error ? r(i) : {
                                code: i.country
                            }
                        } catch (e) {
                            return r({
                                error: "Invalid response (" + e + ")"
                            })
                        }
                    }
                }
            },
            ipinfodb: function(e) {
                return {
                    url: "//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
                    isScript: !0,
                    callback: function(e, t) {
                        try {
                            var i = JSON.parse(t);
                            return "ERROR" == i.statusCode ? r({
                                error: i.statusMessage
                            }) : {
                                code: i.countryCode
                            }
                        } catch (e) {
                            return r({
                                error: "Invalid response (" + e + ")"
                            })
                        }
                    }
                }
            },
            maxmind: function() {
                return {
                    url: "//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
                    isScript: !0,
                    callback: function(t) {
                        window.geoip2 ? geoip2.country(function(e) {
                            try {
                                t({
                                    code: e.country.iso_code
                                })
                            } catch (e) {
                                t(r(e))
                            }
                        }, function(e) {
                            t(r(e))
                        }) : t(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"))
                    }
                }
            }
        }
    }, s.prototype.getNextService = function() {
        for (var e; e = this.getServiceByIdx(++this.currentServiceIndex), this.currentServiceIndex < this.options.services.length && !e;);
        return e
    }, s.prototype.getServiceByIdx = function(e) {
        return "function" != typeof(e = this.options.services[e]) ? "string" == typeof e ? this.options.serviceDefinitions[e]() : u.isPlainObject(e) ? this.options.serviceDefinitions[e.name](e) : null : ((e = e()).name && u.deepExtend(e, this.options.serviceDefinitions[e.name](e)), e)
    }, s.prototype.locate = function(e, t) {
        var i = this.getNextService();
        i ? (this.callbackComplete = e, this.callbackError = t, this.runService(i, this.runNextServiceOnError.bind(this))) : t(new Error("No services to run"))
    }, s.prototype.setupUrl = function(n) {
        var o = this.getCurrentServiceOpts();
        return n.url.replace(/\{(.*?)\}/g, function(e, t) {
            if ("callback" === t) {
                var i = "callback" + Date.now();
                return window[i] = function(e) {
                    n.__JSONP_DATA = JSON.stringify(e)
                }, i
            }
            if (t in o.interpolateUrl) return o.interpolateUrl[t]
        })
    }, s.prototype.runService = function(t, i) {
        var n = this;
        t && t.url && t.callback && (t.isScript ? function(e, t, i) {
            var n, o = document.createElement("script");
            o.type = "text/" + (e.type || "javascript"), o.src = e.src || e, o.async = !1, o.onreadystatechange = o.onload = function() {
                var e = o.readyState;
                clearTimeout(n), t.done || e && !/loaded|complete/.test(e) || (t.done = !0, t(), o.onreadystatechange = o.onload = null)
            }, document.body.appendChild(o), n = setTimeout(function() {
                t.done = !0, t(), o.onreadystatechange = o.onload = null
            }, i)
        } : function(e, t, i, n, o) {
            var s = new(window.XMLHttpRequest || window.ActiveXObject)("MSXML2.XMLHTTP.3.0");
            if (s.open(n ? "POST" : "GET", e, 1), s.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), Array.isArray(o))
                for (var r = 0, a = o.length; r < a; ++r) {
                    var c = o[r].split(":", 2);
                    s.setRequestHeader(c[0].replace(/^\s+|\s+$/g, ""), c[1].replace(/^\s+|\s+$/g, ""))
                }
            "function" == typeof t && (s.onreadystatechange = function() {
                3 < s.readyState && t(s)
            }), s.send(n)
        })(this.setupUrl(t), function(e) {
            e = e ? e.responseText : "", t.__JSONP_DATA && (e = t.__JSONP_DATA, delete t.__JSONP_DATA), n.runServiceCallback.call(n, i, t, e)
        }, this.options.timeout, t.data, t.headers)
    }, s.prototype.runServiceCallback = function(t, e, i) {
        var n = this,
            o = e.callback(function(e) {
                o || n.onServiceResult.call(n, t, e)
            }, i);
        o && this.onServiceResult.call(this, t, o)
    }, s.prototype.onServiceResult = function(e, t) {
        t instanceof Error || t && t.error ? e.call(this, t, null) : e.call(this, null, t)
    }, s.prototype.runNextServiceOnError = function(e, t) {
        e ? (this.logError(e), (e = this.getNextService()) ? this.runService(e, this.runNextServiceOnError.bind(this)) : this.completeService.call(this, this.callbackError, new Error("All services failed"))) : this.completeService.call(this, this.callbackComplete, t)
    }, s.prototype.getCurrentServiceOpts = function() {
        var e = this.options.services[this.currentServiceIndex];
        return "string" == typeof e ? {
            name: e
        } : "function" == typeof e ? e() : u.isPlainObject(e) ? e : {}
    }, s.prototype.completeService = function(e, t) {
        this.currentServiceIndex = -1, e && e(t)
    }, s.prototype.logError = function(e) {
        var t = this.currentServiceIndex,
            i = this.getServiceByIdx(t);
        console.warn("The service[" + t + "] (" + i.url + ") responded with the following error", e)
    }, s), h.Law = (t = {
        regionalLaw: !0,
        hasLaw: ["AT", "BE", "BG", "HR", "CZ", "CY", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "SK", "ES", "SE", "GB", "UK", "GR", "EU"],
        revokable: ["HR", "CY", "DK", "EE", "FR", "DE", "LV", "LT", "NL", "PT", "ES"],
        explicitAction: ["HR", "IT", "ES"]
    }, e.prototype.initialise = function(e) {
        u.deepExtend(this.options = {}, t), u.isPlainObject(e) && u.deepExtend(this.options, e)
    }, e.prototype.get = function(e) {
        var t = this.options;
        return {
            hasLaw: 0 <= t.hasLaw.indexOf(e),
            revokable: 0 <= t.revokable.indexOf(e),
            explicitAction: 0 <= t.explicitAction.indexOf(e)
        }
    }, e.prototype.applyLaw = function(e, t) {
        var i = this.get(t);
        return i.hasLaw || (e.enabled = !1, "function" == typeof e.onNoCookieLaw && e.onNoCookieLaw(t, i)), this.options.regionalLaw && (i.revokable && (e.revokable = !0), i.explicitAction && (e.dismissOnScroll = !1, e.dismissOnTimeout = !1)), e
    }, e), h.initialise = function(t, i, n) {
        var o = new h.Law(t.law);
        i = i || function() {}, n = n || function() {};
        var e = Object.keys(h.status),
            s = u.getCookie("cookieconsent_status");
        0 <= e.indexOf(s) ? i(new h.Popup(t)) : h.getCountryCode(t, function(e) {
            delete t.law, delete t.location, e.code && (t = o.applyLaw(t, e.code)), i(new h.Popup(t))
        }, function(e) {
            delete t.law, delete t.location, n(e, new h.Popup(t))
        })
    }, h.getCountryCode = function(e, t, i) {
        e.law && e.law.countryCode ? t({
            code: e.law.countryCode
        }) : e.location ? new h.Location(e.location).locate(function(e) {
            t(e || {})
        }, i) : t({})
    }, h.utils = u, h.hasInitialised = !0, window.cookieconsent = h)
}(window.cookieconsent || {});