/**
 * readerfront - readerFront its a FrontEnd app using FoolSlide as BackEnd
 * @authors 
 * @version v0.0.7
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.widgets","app.comic","app.list","app.layout","app.releases","app.reader","app.blog"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.blog",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.comic",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","restangular","cfp.hotkeys","ngStorage"])}(),function(){"use strict";angular.module("app.layout",["app.core","ui.bootstrap.collapse"])}(),function(){"use strict";angular.module("app.list",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.reader",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.releases",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.widgets",[])}(),function(){"use strict";function e(){this.config={appErrorPrefix:void 0},this.configure=function(e){this.config.appErrorPrefix=e},this.$get=function(){return{config:this.config}}}function t(e){e.decorator("$exceptionHandler",a)}function a(e,t,a){return function(s,n){var r=t.config.appErrorPrefix||"",i={exception:s,cause:n};s.message=r+s.message,a.error(s.message,i),e(s,n)}}angular.module("blocks.exception").provider("exceptionHandler",e).config(t),t.$inject=["$provide"],a.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function e(e,t){function a(a){return function(s){var n,r;return s.data&&s.data.description&&(n="\n"+s.data.description,r=a+n),s.data.description=r,t.error(r),e.reject(s)}}var s={catcher:a};return s}e.$inject=["$q","logger"],angular.module("blocks.exception").factory("exception",e)}(),function(){"use strict";function e(e,t){function a(a,s,n){t.error(a,n),e.error("Error: "+a,s)}function s(a,s,n){t.info(a,n),e.info("Info: "+a,s)}function n(a,s,n){t.success(a,n),e.info("Success: "+a,s)}function r(a,s,n){t.warning(a,n),e.warn("Warning: "+a,s)}var i={showToasts:!0,error:a,info:s,success:n,warning:r,log:e.log};return i}angular.module("blocks.logger").factory("logger",e),e.$inject=["$log","toastr"]}(),function(){"use strict";function e(e,t,a){function s(e,s,r,i){function o(e,s){e.forEach(function(e){e.config.resolve=angular.extend(e.config.resolve||{},n.resolveAlways),t.state(e.state,e.config)}),s&&!g&&(g=!0,a.otherwise(s))}function c(){s.$on("$stateChangeError",function(t,a,s,n,r,o){if(!d){h.errors++,d=!0;var c=a&&(a.title||a.name||a.loadedTemplateUrl)||"unknown target",l="Error routing to "+c+". "+(o.data||"")+". <br/>"+(o.statusText||"")+": "+(o.status||"");i.warning(l,[a]),e.path("/")}})}function l(){c(),u()}function p(){return r.get()}function u(){s.$on("$stateChangeSuccess",function(e,t){h.changes++,d=!1;var a=n.docTitle+" "+(t.title||"");s.title=a})}var d=!1,g=!1,h={errors:0,changes:0},m={configureStates:o,getStates:p,stateCounts:h};return l(),m}var n={docTitle:void 0,resolveAlways:{}};window.history&&window.history.pushState||(window.location.hash="/"),e.html5Mode(!0),this.configure=function(e){angular.extend(n,e)},this.$get=s,s.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",e),e.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e,t,a,s,n){function r(){var e=void 0!==n.stub&&null!==n.stub?[o()]:[i()];return t.all(e).then(function(){})}function i(){var e={};return s.getPosts(e).then(function(e){return c.posts=e,c.posts})}function o(){var e={stub:n.stub};return s.getPost(e).then(function(e){return c.post=e.data.post,c.post})}var c=this;c.post={},c.posts=[],c.getPosts=i,c.getPost=o,r()}angular.module("app.blog").controller("BlogController",e),e.$inject=["$scope","$q","logger","Api","$stateParams"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"blog",config:{"abstract":!0,template:"<ui-view/>",title:"Blog",settings:{nav:0,content:'<i class="fa fa-newspaper-o></i> Blog'}}},{state:"blog.all",config:{url:"/blog",templateUrl:"app/blog/blog.html",controller:"BlogController",controllerAs:"vm",title:"Blog",settings:{nav:0,content:'<i class="fa fa-newspaper-o"></i> Blog'}}},{state:"blog.posts",config:{url:"/blog/post/:stub",templateUrl:"app/blog/post.html",controller:"BlogController",controllerAs:"vm",title:"Blog",settings:{nav:0,content:'<i class="fa fa-newspaper-o"></i> Blog'}}}]}angular.module("app.blog").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e,t,a,s,n){function r(){var t=[o()];return e.all(t).then(function(){})}function i(e){n.open(e,"_blank")}function o(){return a.getComic({stub:s.id}).then(function(e){return c.comic=e.comic,c.chapters=e.chapters,c.comic}).catch(function(e){t.error(e)})}var c=this;c.getComic=o,c.comic=[],c.chapters=[],c.downloadChapter=i,r()}angular.module("app.comic").controller("ComicController",e),e.$inject=["$q","logger","Api","$stateParams","$window"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"comic",config:{url:"/comic/:id",templateUrl:"app/comic/comic.html",controller:"ComicController",controllerAs:"vm",title:"Comic",settings:{nav:0,content:'<i class="fa fa-lock"></i> Comic'}}}]}angular.module("app.comic").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e,t){var a=function(){return t.get("./rf.config.json")};return{data:a}}angular.module("app.core").factory("newRestangular",e),e.$inject=["Restangular","$http"]}(),function(){"use strict";angular.module("app.core").constant("CUSTOM_CONFIG",{NAME:"readerfront",NAVTITLE:"Reader Front",META:{title:"ReaderFront",description:"Ayyyy",keywords:"scan,manga,english,free"},API:{foolslideUrl:"http://localhost/FoOlSlide/api/v1/"}})}(),function(){"use strict";function e(e){e.options.timeOut=4e3,e.options.positionClass="toast-bottom-right"}function t(e,t,a,n,r,i){function o(e,t){var a;return a="getList"===t?e.data:e}s.appTitle=i.NAVTITLE,e.debugEnabled&&e.debugEnabled(!0),a.configure(s.appErrorPrefix),t.configure({docTitle:s.appTitle+": "}),n.setBaseUrl(i.API.foolslideUrl),n.addResponseInterceptor(o),n.setDefaultHttpFields({AcceptuseXDomain:!0,withCredentials:!0}),n.setDefaultHeaders({"X-Requested-With":"XMLHttpRequest"})}var a=angular.module("app.core");a.config(e),e.$inject=["toastr"];var s={appErrorPrefix:"[App Error] ",appTitle:"<%= name %>"};a.value("config",s),a.config(t),t.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider","RestangularProvider","$locationProvider","CUSTOM_CONFIG"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e){var a="/404";e.configureStates(t(),a)}function t(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}e.$inject=["routerHelper"],angular.module("app.core").run(e)}(),function(){"use strict";function e(e){return{latestChapters:function(t){return e.all("chaptersp").getList(t)},comicsList:function(t){return e.all("comics").getList(t)},getComic:function(t){return e.one("comic").get(t)},getChapter:function(t){return e.one("chapter").get(t)},getComicFull:function(t){return e.all("comics_full").getList(t)},getPosts:function(t){return e.all("blog").getList(t)},getPost:function(t){return e.one("blog").get(t)}}}angular.module("app.core").factory("Api",e),e.$inject=["Restangular","logger"]}(),function(){"use strict";function e(){function e(e,t){function a(t){var a="dropy";t.preventDefault(),n.hasClass(a)?n.hasClass(a)&&(n.removeClass(a),s.slideUp(350,e.whenDoneAnimating)):(s.slideDown(350,e.whenDoneAnimating),n.addClass(a))}var s=t.find(".sidebar-inner"),n=t.find(".sidebar-dropdown a");t.addClass("sidebar"),n.click(a)}var t={link:e,restrict:"EA",scope:{whenDoneAnimating:"&?"}};return t}angular.module("app.layout").directive("htSidebar",e)}(),function(){"use strict";function e(){function e(e){e.isCollapsed=!0}var t={bindToController:!0,controller:e,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return e.$inject=["$scope"],t}angular.module("app.layout").directive("htTopNav",e)}(),function(){"use strict";function e(e,t,a){function s(){n()}function n(){t(function(){e.showSplash=!1},1e3)}var r=this;r.busyMessage="Please wait ...",r.isBusy=!0,e.showSplash=!0,r.navline={title:a.appTitle},s()}angular.module("app.layout").controller("ShellController",e),e.$inject=["$rootScope","$timeout","config","logger"]}(),function(){"use strict";function e(e,t){function a(){s()}function s(){r.navRoutes=i.filter(function(e){return e.settings&&e.settings.nav}).sort(function(e,t){return e.settings.nav-t.settings.nav})}function n(t){if(!t.title||!e.current||!e.current.title)return"";var a=t.title;return e.current.title.substr(0,a.length)===a?"current":""}var r=this,i=t.getStates();r.isCurrent=n,a()}angular.module("app.layout").controller("SidebarController",e),e.$inject=["$state","routerHelper"]}(),function(){"use strict";function e(e,t,a){function s(){var t=[n()];return e.all(t).then(function(){})}function n(){return t.comicsList({orderby:"asc_name"}).then(function(e){return r.comics=e[0].comics,r.comics}).catch(function(e){a.error(e)})}var r=this;r.getComics=n,r.comics=[],s()}angular.module("app.list").controller("ListController",e),e.$inject=["$q","Api","logger"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"list",config:{url:"/list",templateUrl:"app/list/list.html",controller:"ListController",controllerAs:"vm",title:"list",settings:{nav:2,content:'<i class="fa fa-th-list"></i> List'}}}]}angular.module("app.list").run(e),e.$inject=["routerHelper"]}(),function(){angular.module("app").directive("dirDisqus",["$window",function(e){return{restrict:"E",scope:{config:"="},template:'<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink"></a>',link:function(t){function a(){if(t.config.disqus_shortname&&t.config.disqus_identifier&&t.config.disqus_url)if(e.disqus_shortname=t.config.disqus_shortname,e.disqus_identifier=t.config.disqus_identifier,e.disqus_url=t.config.disqus_url,e.disqus_title=t.config.disqus_title,e.disqus_category_id=t.config.disqus_category_id,e.disqus_disable_mobile=t.config.disqus_disable_mobile,e.disqus_config=function(){this.language=t.config.disqus_config_language,this.page.remote_auth_s3=t.config.disqus_remote_auth_s3,this.page.api_key=t.config.disqus_api_key,t.config.disqus_on_ready&&(this.callbacks.onReady=[function(){t.config.disqus_on_ready()}])},e.DISQUS)e.DISQUS.reset({reload:!0,config:function(){this.page.identifier=t.config.disqus_identifier,this.page.url=t.config.disqus_url,this.page.title=t.config.disqus_title,this.language=t.config.disqus_config_language,this.page.remote_auth_s3=t.config.disqus_remote_auth_s3,this.page.api_key=t.config.disqus_api_key}});else{var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="//"+t.config.disqus_shortname+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)}}t.$watch("config",a,!0)}}}])}(),function(){"use strict";function e(e,t,a,s,n,r,i,o,c,l,p){function u(){x.webtoonMode=!1;var e=[g(),h()];return t.all(e).then(function(){y()})}function d(){e.disqusConfig={disqus_shortname:"ravens-scans-english",disqus_identifier:"RS_"+x.params.id+"_"+x.params.chapter,disqus_url:window.location.href,disqus_title:x.comic.name+" chapter "+x.chapter.chapter+" - "+e.siteName,disqus_disable_mobile:"false"}}function g(){var e={};return e="undefined"!=typeof x.params.chapter&&-1!==x.params.chapter.indexOf(".")?{stub:x.params.id,chapter:x.params.chapter.split(".")[0],subchapter:x.params.chapter.split(".")[1]}:{stub:x.params.id,chapter:x.params.chapter},s.getComic(e).then(function(e){return x.comic=e.comic,angular.forEach(e.chapters,function(e){-1!==x.params.chapter.indexOf(".")?e.chapter.chapter===x.params.chapter.split(".")[0]&&e.chapter.subchapter===x.params.chapter.split(".")[1]&&(x.chapter=e.chapter):e.chapter.chapter===x.chapterSelected&&"0"===e.chapter.subchapter&&(x.chapter=e.chapter),"Oneshots"===x.comic.name&&x.chaptersOneshots.push(e.chapter.name),x.chapters.push(null!==e.chapter.subchapter&&"0"!==e.chapter.subchapter?e.chapter.chapter+"."+e.chapter.subchapter:e.chapter.chapter),parseInt(e.chapter.chapter)>=parseInt(x.lastestChapter)&&(x.lastestChapter=parseInt(e.chapter.chapter))}),x.pages=x.chapter.pages,angular.forEach(x.pages,function(e,t){x.pagesList.push(t+1)}),x.lastPage=x.pages.length,d(),x.comic})}function h(){return s.comicsList().then(function(e){return x.comics=e[0].comics,x.comics})}function m(e){x.pageSelected=null===e||x.pageSelected===x.lastPage?"END":0>=e?1:e,i.hash(x.webtoonMode&&"END"!==x.pageSelected?"page_"+(x.pageSelected-2):"topRead"),o()}function f(e){x.pageSelected===x.lastPage?x.lastestChapter!==parseInt(x.chapter.chapter)?c.go("read",{id:x.comic.stub,chapter:parseInt(x.chapter.chapter)+1,subchapter:0}):x.pageSelected="END":x.pageSelected=e+2,i.hash(x.webtoonMode?"page_"+(x.pageSelected-2):"topRead"),o()}function v(){l.open(x.chapter.download_href,"_blank")}function b(){x.webtoonMode===!0?x.webtoonMode=!1:(x.webtoonMode=!0,i.hash("page_"+(x.pageSelected-1)),o())}function w(e){return x.webtoonMode||x.pageSelected-1===e?!0:!1}function y(){(void 0===p.navInfo||null===p.navInfo)&&(a.info("Use W-A-S-D or the arrow keys to navigate"),p.navInfo=!0)}var x=this;x.comic=[],x.comics=[],x.chapter=[],x.chapters=[],x.chaptersOneshots=[],x.pages=[],x.pagesList=[],x.pageSelected=1,x.lastestChapter=0,x.params=n,x.chapterSelected=x.params.chapter,x.lastPage=0,x.getComic=g,x.getComics=h,x.changePageSelected=m,x.changePageClick=f,x.setDisqusConfig=d,x.downloadChapter=v,x.changeWebtoonMode=b,x.showImages=w,u(),r.add({combo:"right",description:"Next page",callback:function(){m("END"!==x.pageSelected?x.pageSelected+1:null)}}),r.add({combo:"d",description:"Next page",callback:function(){m("END"!==x.pageSelected?x.pageSelected+1:null)}}),r.add({combo:"left",description:"Previous page",callback:function(){m("END"!==x.pageSelected?x.pageSelected-1:null)}}),r.add({combo:"a",description:"Previous page",callback:function(){m("END"!==x.pageSelected?x.pageSelected-1:null)}})}angular.module("app.reader").controller("ReaderController",e),e.$inject=["$scope","$q","logger","Api","$stateParams","hotkeys","$location","$anchorScroll","$state","$window","$localStorage"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"read",config:{url:"/read/:id/chapter/:chapter.:subchapter",templateUrl:"app/reader/reader.html",controller:"ReaderController",controllerAs:"vm",title:"Reader",settings:{nav:0,content:'<i class="fa fa-lock"></i> Comic'}}}]}angular.module("app.reader").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(){var e={restrict:"EA",scope:{release:"=release"},templateUrl:"app/releases/card.html"};return e}angular.module("app.releases").directive("card",e)}(),function(){"use strict";function e(e,t,a){function s(){var t=[n()];return e.all(t).then(function(){})}function n(){return t.latestChapters({per_page:8,orderby:"desc_created"}).then(function(e){return r.releases=e[0].chapters,r.releases}).catch(function(e){a.error(e)})}var r=this;r.releases=[],r.getReleases=n,r.loadChapters=s,s()}angular.module("app.releases").controller("ReleasesController",e),e.$inject=["$q","Api","logger"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"releases",config:{url:"/",templateUrl:"app/releases/releases.html",controller:"ReleasesController",controllerAs:"vm",title:"Releases",settings:{nav:1,content:'<i class="fa fa-archive"></i> Releases'}}}]}angular.module("app.releases").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(){function e(e,t){e.toggleContent=function(){if("true"===e.allowCollapse){var a=angular.element(t).siblings(".widget-content");a.toggle()}}}var t={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA",link:e};return t}angular.module("app.widgets").directive("htWidgetHeader",e)}(),angular.module("app.core").run(["$templateCache",function(e){e.put("app/blog/blog.html",'<br><div class=panel ng-repeat="post in vm.posts"><div class=wrapper-lg><h2 class=m-t-none><a ui-sref="blog.posts({stub: post.stub})">{{post.name}}</a></h2><div>{{post.description}}</div><div class="line line-lg b-b b-light"></div><div class=text-muted><i class="fa fa-user text-muted"></i> by <a href class=m-r-sm>{{post.creator}}</a> <i class="fa fa-clock-o text-muted"></i> {{post.updated}}</div></div></div>'),e.put("app/blog/post.html",'<br><div class=panel><div class=wrapper-lg><h2 class=m-t-none>{{vm.post.name}}</h2><div>{{vm.post.description}}</div><div class="line line-lg b-b b-light"></div><div class=text-muted><i class="fa fa-user text-muted"></i> by <a href class=m-r-sm>{{vm.post.creator}}</a> <i class="fa fa-clock-o text-muted"></i> {{vm.post.created }}</div></div></div>'),e.put("app/comic/comic.html",'<div class=wrapper-md><div class=row><div class=col-md-4><div class="panel wrapper" style="height: 100%;"><img src={{vm.comic.fullsized_thumb_url}} style="width: 100%;"></div></div><div class=col-md-8><div class="panel wrapper"><h4 class="font-thin m-t-none m-b text-muted">Description</h4>{{vm.comic.description}}</div></div><div class=col-md-8><div class="panel wrapper"><h4 class="font-thin m-t-none m-b text-muted">Info</h4>Author: {{vm.comic.author}}<br>Artist: {{vm.comic.artist}}</div></div><div class=col-sm-8><div class="panel panel-default"><div class=panel-heading>Chapters</div><table class="table table-striped m-b-none"><thead><tr><th></th><th style=width:70px;></th></tr></thead><tbody><tr ng-repeat="chapter in vm.chapters | orderBy:\'-chapter\'"><td><a ui-sref="read({id: vm.comic.stub, chapter: chapter.chapter.chapter, subchapter: chapter.chapter.subchapter })"><span ng-show=!chapter.chapter.name>#{{chapter.chapter.chapter}}: Chapter {{chapter.chapter.chapter}}</span> <span ng-show=chapter.chapter.name>#{{chapter.chapter.chapter}}: {{chapter.chapter.name}}</span></a></td><td><a ng-click=vm.downloadChapter(chapter.chapter.download_href)><i class="fa fa-cloud-download"></i></a></td></tr></tbody></table></div></div></div><div class=row></div></div>'),e.put("app/core/404.html",'<div class=wrapper-md><div class=row><div class=col-md-12><div class="panel wrapper" style="height: 100%;"><h1>Error 404: Page Not Found</h1></div></div></div></div>'),e.put("app/layout/ht-top-nav.html",'<div class="app-header navbar box-shadow"><div class="navbar-header {{app.settings.navbarHeaderColor}}"><button class="pull-right visible-xs dk" ui-toggle-class=show data-target=.navbar-collapse><i class="glyphicon glyphicon-cog"></i></button> <button class="pull-right visible-xs" ui-toggle-class=off-screen data-target=.app-aside ui-scroll-to=app><i class="glyphicon glyphicon-align-justify"></i></button><a href="#/" class="navbar-brand text-lt"><img src=img/logors.png alt=. class=hide> <span class=m-l-xs>{{vm.navline.title}}</span></a></div><div class="collapse pos-rlt navbar-collapse {{app.settings.navbarCollapseColor}}"><ul class="nav navbar-nav hidden-sm"></ul><ul class="nav navbar-nav navbar-right" ng-controller="SidebarController as vm"><li ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a ui-sref={{r.name}} ng-bind-html=r.settings.content><span></span></a></li></ul></div></div>'),e.put("app/layout/shell.html",'<div class="app app-header-fixed app-aside-folded app-aside-dock container" id=app ng-controller="ShellController as vm"><header><ht-top-nav navline=vm.navline></ht-top-nav></header><section id=content class=content><div ui-view class="app-content-body fade-in-up"></div></section></div>'),e.put("app/layout/shell.reader.html",'<div class="app app-header-fixed app-aside-folded app-aside-dock container" id=app ng-controller="ShellController as vm"><section id=content class=content><div ui-view class=shuffle-animation></div><div ngplus-overlay ngplus-overlay-delay-in=50 ngplus-overlay-delay-out=700 ngplus-overlay-animation=dissolve-animation><img src=images/busy.gif><div class="page-spinner-message overlay-message">{{vm.busyMessage}}</div></div></section></div>'),e.put("app/layout/sidebar.html",'<div ng-controller="SidebarController as vm"><ht-sidebar when-done-animating=vm.sidebarReady()><div class=sidebar-filler></div><div class=sidebar-dropdown><a href=#>Menu</a></div><div class=sidebar-inner><div class=sidebar-widget></div><ul class=navi><li class="nlightblue fade-selection-animation" ng-class=vm.isCurrent(r) ng-repeat="r in vm.navRoutes"><a ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></ht-sidebar></div>'),e.put("app/list/list.html",'<div class=wrapper-md><center id=md-spinner ng-show=vm.loading><svg class=spinner width=100px height=100px viewbox="0 0 66 66" xmlns=http://www.w3.org/2000/svg><circle class=path fill=none stroke-width=6 stroke-linecap=round cx=33 cy=33 r=30></circle></svg></center><div ng-hide=vm.loading class=posts id=posts ng-repeat="comic in vm.comics"><a ui-sref="comic({id: comic.stub})" class="post type-post status-publish format-standard has-post-thumbnail hentry animated fadeIn" style="background-image: url({{comic.fullsized_thumb_url}});"><div class=post-overlay><div class=archive-post-header><p class=archive-post-date ng-hide="comic.author === comic.artist">{{comic.author}} & {{comic.artist}}</p><p class=archive-post-date ng-show="comic.author === comic.artist">{{comic.author}}</p><h2 class=archive-post-title>{{comic.name}}</h2></div></div></a></div></div>'),e.put("app/reader/reader.html",'<div class=wrapper-md><div class=row><div class=col-md-12><div class="panel wrapper"><div class=row><div class=col-md-12><div class="btn-group dropdown"><button class="btn btn-default btn-sm btn-bg dropdown-toggle" data-toggle=dropdown aria-expanded=false><span class=dropdown-label>{{vm.comic.name}}</span> <span class=caret></span></button><ul class="dropdown-menu text-left text-sm scrollable" style=max-height:270px><li ng-repeat="comic in vm.comics"><a ui-sref="comic({id: comic.stub})">{{comic.name}}</a></li></ul></div><div class="btn-group dropdown"><button class="btn btn-default btn-sm btn-bg dropdown-toggle" data-toggle=dropdown aria-expanded=false><span class=dropdown-label><span ng-if="vm.comic.name !== \'Oneshots\'">Chapter {{vm.chapterSelected}}</span> <span ng-if="vm.comic.name === \'Oneshots\'">{{vm.chapter.name}}</span></span> <span class=caret></span></button><ul class="dropdown-menu text-left text-sm scrollable" style=max-height:270px><li ng-repeat="chapter in vm.chapters track by $index"><a ui-sref="read({stub: vm.comic.stub,chapter: chapter})"><span ng-if="vm.comic.name !== \'Oneshots\'">Chapter {{chapter}}</span> <span ng-if="vm.comic.name === \'Oneshots\'">{{vm.chaptersOneshots[$index]}}</span></a></li></ul></div><div class="btn-group dropdown"><button class="btn btn-default btn-sm btn-bg dropdown-toggle" data-toggle=dropdown aria-expanded=false><span class=dropdown-label><span ng-if="vm.pageSelected !== \'END\'">Page {{vm.pageSelected}}</span> <span ng-if="vm.pageSelected === \'END\'">Comments</span></span> <span class=caret></span></button><ul class="dropdown-menu text-left text-sm scrollable" style=max-height:270px><li ng-repeat="page in vm.pagesList"><a ng-click=vm.changePageSelected(page)>Page {{page}}</a></li><li><a ng-click="vm.changePageSelected(\'END\')">Comments</a></li></ul></div><div class=pull-right><h1 class="m-n font-thin h3">{{vm.chapter.name}} <a popover="Download chapter!" popover-trigger=mouseenter popover-placement=bottom ng-show=vm.chapter.download_href ng-click=vm.downloadChapter()><span class=badge><i class="fa fa-cloud-download"></i></span></a></h1></div><div class=pull-right style=padding-right:15px;><button class="btn btn-default btn-xs" ng-class="{active: vm.webtoonMode === true}" ng-click=vm.changeWebtoonMode()>Webtoon Mode</button></div></div></div></div></div></div></div><div class=row><div class=col-md-12><div class=text-center ng-hide="vm.pageSelected === \'END\'" ng-repeat="page in vm.pages track by $index"><img id=page_{{$index}} ng-show=vm.showImages($index) ng-click=vm.changePageClick($index) src={{page.url}} style=max-width:100%;margin-bottom:5px;></div><div ng-show="vm.pageSelected === \'END\'"><div class="panel wrapper"><div class=row><div class=col-md-12><h2 class=m-t-none>Thanks for Reading!</h2>You\'ve reached the end of the current {{vm.comic.name}} chapters we have available for you here at Ravens Scans. Don\'t worry though, as long as the series hasn\'t ended we will have the next chapter up as soon as we can.</div></div></div></div></div></div>'),e.put("app/releases/card.html","<a ui-sref=\"read({id: release.comic.stub, chapter: release.chapter.chapter, subchapter: release.chapter.subchapter })\" class=\"post type-post status-publish format-standard has-post-thumbnail hentry animated fadeIn\" ng-style=\"release.comic.adult != '1' && {'background-image': 'url({{release.pages[2].url}})' } || release.comic.adult == '1' && {'background-image': 'linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)),url({{release.pages[2].url}})' }\" ng-class=\"{adultcover: release.comic.adult == '1'}\"><div class=post-overlay><p class=post-comic-name style=\"margin-top: 6px; margin-left: 8px;\">{{release.comic.name}}</p><div class=archive-post-header><p class=archive-post-date ng-hide=\"release.comic.name == 'Oneshots'\">{{release.chapter.name}}</p><h2 class=archive-post-title ng-show=\"release.comic.name == 'Oneshots'\">{{release.chapter.name}}</h2><h2 class=archive-post-title ng-hide=\"release.comic.name == 'Oneshots'\">Chapter {{release.chapter.chapter}}</h2></div></div></a>"),e.put("app/releases/releases.html",'<div class=wrapper-md><center id=md-spinner ng-show=vm.loading><svg class=spinner width=100px height=100px viewbox="0 0 66 66" xmlns=http://www.w3.org/2000/svg><circle class=path fill=none stroke-width=6 stroke-linecap=round cx=33 cy=33 r=30></circle></svg></center><div ng-hide=vm.loading class=posts id=posts ng-repeat="release in vm.releases"><card release=release></card></div></div>'),e.put("app/widgets/widget-header.html",'<div class=widget-head ng-class="{\'collapsive\': allowCollapse === \'true\'}" ng-click=toggleContent()><div class="page-title pull-left">{{title}}</div><small class=page-title-subtle ng-show=subtitle>({{subtitle}})</small><div class="widget-icons pull-right"></div><small class="pull-right page-title-subtle" ng-show=rightText>{{rightText}}</small><div class=clearfix></div></div>')}]);