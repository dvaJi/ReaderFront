# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.3.0](https://github.com/dvaJi/ReaderFront/compare/v4.2.0...v4.3.0) (2019-06-25)


### Bug Fixes

* **admincp:** datepicker failed because needs parsed date ([#301](https://github.com/dvaJi/ReaderFront/issues/301)) ([417471b](https://github.com/dvaJi/ReaderFront/commit/417471b))
* **reader:** prev button is deactivated in the second chapter ([#284](https://github.com/dvaJi/ReaderFront/issues/284)) ([c820e43](https://github.com/dvaJi/ReaderFront/commit/c820e43))
* chapters are not being filtered by language in Work view ([#250](https://github.com/dvaJi/ReaderFront/issues/250)) ([62fa66c](https://github.com/dvaJi/ReaderFront/commit/62fa66c))
* **package:** update apollo-boost to version 0.3 ([dd4a314](https://github.com/dvaJi/ReaderFront/commit/dd4a314))


### Features

* add support for Netlify ([#280](https://github.com/dvaJi/ReaderFront/issues/280)) ([b0c6564](https://github.com/dvaJi/ReaderFront/commit/b0c6564))
* **core:** add a dark theme ([#268](https://github.com/dvaJi/ReaderFront/issues/268)) ([6616ece](https://github.com/dvaJi/ReaderFront/commit/6616ece))
* add anonymizer to chapter downloads ([#246](https://github.com/dvaJi/ReaderFront/issues/246)) ([df86709](https://github.com/dvaJi/ReaderFront/commit/df86709))
* implement usage of CDNs for images ([#249](https://github.com/dvaJi/ReaderFront/issues/249)) ([a404b62](https://github.com/dvaJi/ReaderFront/commit/a404b62))
* optimize images using the crop parameter in photon cdn ([#253](https://github.com/dvaJi/ReaderFront/issues/253)) ([bd67971](https://github.com/dvaJi/ReaderFront/commit/bd67971))



# [4.2.0](https://github.com/dvaJi/ReaderFront/compare/v4.1.0...v4.2.0) (2019-02-25)


### Bug Fixes

* fix simple-slugify-string import ([8278304](https://github.com/dvaJi/ReaderFront/commit/8278304))
* language detection didn't work correctly ([#233](https://github.com/dvaJi/ReaderFront/issues/233)) ([0e5eecf](https://github.com/dvaJi/ReaderFront/commit/0e5eecf))
* reader is not updating the actual chapter ([#196](https://github.com/dvaJi/ReaderFront/issues/196)) ([3bea6fd](https://github.com/dvaJi/ReaderFront/commit/3bea6fd))
* **Reader:** next and previous buttons were giving the id instead of the name of the language ([#210](https://github.com/dvaJi/ReaderFront/issues/210)) ([ccb7a5c](https://github.com/dvaJi/ReaderFront/commit/ccb7a5c))
* refactor layout reducer and action to use intl ([#237](https://github.com/dvaJi/ReaderFront/issues/237)) ([0499e19](https://github.com/dvaJi/ReaderFront/commit/0499e19))
* **admincp:** use FileReader to create a preview before upload and update the filename from server ([#172](https://github.com/dvaJi/ReaderFront/issues/172)) ([bb3420e](https://github.com/dvaJi/ReaderFront/commit/bb3420e))
* **ci:** add new workflow to handle deploy only on tags ([#230](https://github.com/dvaJi/ReaderFront/issues/230)) ([457a749](https://github.com/dvaJi/ReaderFront/commit/457a749))
* the markdown editor wasn't updating properly ([d559d1c](https://github.com/dvaJi/ReaderFront/commit/d559d1c))
* use status instead statusText to check if response is ok ([#166](https://github.com/dvaJi/ReaderFront/issues/166)) ([42a482e](https://github.com/dvaJi/ReaderFront/commit/42a482e))
* **home:** adapt new styles to small covers ([#228](https://github.com/dvaJi/ReaderFront/issues/228)) ([3d5ad96](https://github.com/dvaJi/ReaderFront/commit/3d5ad96))
* **releases:** chapters were not correctly assigned ([#214](https://github.com/dvaJi/ReaderFront/issues/214)) ([e53dfc8](https://github.com/dvaJi/ReaderFront/commit/e53dfc8))


### Features

* add a new editor and add urls to post ([#199](https://github.com/dvaJi/ReaderFront/issues/199)) ([4f74497](https://github.com/dvaJi/ReaderFront/commit/4f74497))
* **home:** refactor Home ([#215](https://github.com/dvaJi/ReaderFront/issues/215)) ([70e236e](https://github.com/dvaJi/ReaderFront/commit/70e236e))
* new view to upload pages ([#192](https://github.com/dvaJi/ReaderFront/issues/192)) ([43d6dcb](https://github.com/dvaJi/ReaderFront/commit/43d6dcb))
* **admincp:** refactor admin chapters ([#236](https://github.com/dvaJi/ReaderFront/issues/236)) ([56ae03a](https://github.com/dvaJi/ReaderFront/commit/56ae03a))
* refactor releases ([#203](https://github.com/dvaJi/ReaderFront/issues/203)) ([fffd2c2](https://github.com/dvaJi/ReaderFront/commit/fffd2c2))
* use rich-markdown-editor lib instead of custom component ([#197](https://github.com/dvaJi/ReaderFront/issues/197)) ([6b5ca49](https://github.com/dvaJi/ReaderFront/commit/6b5ca49))
* **admincp:** refactor work ([#231](https://github.com/dvaJi/ReaderFront/issues/231)) ([e1f6c21](https://github.com/dvaJi/ReaderFront/commit/e1f6c21))
* **Blog:** refactor blog module, now it uses react-apollo to fetch data ([#209](https://github.com/dvaJi/ReaderFront/issues/209)) ([d176aed](https://github.com/dvaJi/ReaderFront/commit/d176aed))
* **ci:** add new configuration to continuous deployment ([#176](https://github.com/dvaJi/ReaderFront/issues/176)) ([efc1022](https://github.com/dvaJi/ReaderFront/commit/efc1022))
* **reader:** refactor Reader ([#220](https://github.com/dvaJi/ReaderFront/issues/220)) ([1acd51f](https://github.com/dvaJi/ReaderFront/commit/1acd51f))
* **work:** refactor work, new design ([#226](https://github.com/dvaJi/ReaderFront/issues/226)) ([a301da4](https://github.com/dvaJi/ReaderFront/commit/a301da4))
* **works:** refactor Works ([#218](https://github.com/dvaJi/ReaderFront/issues/218)) ([96f2e0c](https://github.com/dvaJi/ReaderFront/commit/96f2e0c))


### Performance Improvements

* **core:** use a better config for LazyLoad and add some advice from lighthouse ([#180](https://github.com/dvaJi/ReaderFront/issues/180)) ([2947fd0](https://github.com/dvaJi/ReaderFront/commit/2947fd0))



# [4.1.0](https://github.com/dvaJi/ReaderFront/compare/v4.0.0...v4.1.0) (2018-11-11)


### Bug Fixes

* add router as props in auth (activate account and signup) ([#164](https://github.com/dvaJi/ReaderFront/issues/164)) ([a592b86](https://github.com/dvaJi/ReaderFront/commit/a592b86))
* change stub to work like foolslider one ([#163](https://github.com/dvaJi/ReaderFront/issues/163)) ([69fddc9](https://github.com/dvaJi/ReaderFront/commit/69fddc9))
* works, chapters and posts can be hidden ([#159](https://github.com/dvaJi/ReaderFront/issues/159)) ([c84835b](https://github.com/dvaJi/ReaderFront/commit/c84835b))


### Features

* add censorship to Home and Releases modules ([#160](https://github.com/dvaJi/ReaderFront/issues/160)) ([6bd3f9c](https://github.com/dvaJi/ReaderFront/commit/6bd3f9c))
* chapters are sorted by releaseDate column ([#157](https://github.com/dvaJi/ReaderFront/issues/157)) ([acf3b0d](https://github.com/dvaJi/ReaderFront/commit/acf3b0d))
* use env variables instead plain js config ([#155](https://github.com/dvaJi/ReaderFront/issues/155)) ([017568d](https://github.com/dvaJi/ReaderFront/commit/017568d))



# [4.0.0](https://github.com/dvaJi/ReaderFront/compare/v3.5.0...v4.0.0) (2018-10-14)


### Features

* **admincp:** Manage chapters and pages ([#98](https://github.com/dvaJi/ReaderFront/issues/98)) ([e563415](https://github.com/dvaJi/ReaderFront/commit/e563415))
* Graphql integration ([#77](https://github.com/dvaJi/ReaderFront/issues/77)) ([ac0628a](https://github.com/dvaJi/ReaderFront/commit/ac0628a))
* New Auth module, it includes Login, Signup and Activate Account. ([#85](https://github.com/dvaJi/ReaderFront/issues/85)) ([42bc324](https://github.com/dvaJi/ReaderFront/commit/42bc324))
* use react-helmet ([#96](https://github.com/dvaJi/ReaderFront/issues/96)) ([dd4c9ec](https://github.com/dvaJi/ReaderFront/commit/dd4c9ec))
* **admincp:** add posts ([#115](https://github.com/dvaJi/ReaderFront/issues/115)) ([e5b906c](https://github.com/dvaJi/ReaderFront/commit/e5b906c))
* **admincp:** new simple Dashboard module ([#87](https://github.com/dvaJi/ReaderFront/issues/87)) ([3a162bc](https://github.com/dvaJi/ReaderFront/commit/3a162bc))
* **admincp:** works ([#91](https://github.com/dvaJi/ReaderFront/issues/91)) ([4881fd8](https://github.com/dvaJi/ReaderFront/commit/4881fd8))
* **common:** Improve language detector ([#103](https://github.com/dvaJi/ReaderFront/issues/103)) ([ad05ae5](https://github.com/dvaJi/ReaderFront/commit/ad05ae5))
* **core:** add react-loadable to create chunks to reduce initial loading time ([#117](https://github.com/dvaJi/ReaderFront/issues/117)) ([d0a9a5d](https://github.com/dvaJi/ReaderFront/commit/d0a9a5d))
* **core:** generate thumbnails ([#120](https://github.com/dvaJi/ReaderFront/issues/120)) ([a810090](https://github.com/dvaJi/ReaderFront/commit/a810090))
* **core:** use react-intl ([#100](https://github.com/dvaJi/ReaderFront/issues/100)) ([b7ee966](https://github.com/dvaJi/ReaderFront/commit/b7ee966))
* **Reader:** chapters now can be downloaded ([#127](https://github.com/dvaJi/ReaderFront/issues/127)) ([8c91a5a](https://github.com/dvaJi/ReaderFront/commit/8c91a5a))


### BREAKING CHANGES

* * FoOlSlide-API is deprecated, now it uses ReaderFront-API as backend.
* Use axios instead fetch to make HTTP request
* Serie(s) were renamed as Work(s)
* Serie has many people (artist, author, etc)
* Serie has many genres
* Serie has a demographic category and a status (on going, completed and dropped)
* The Blog module has been redesigned



# [3.5.0](https://github.com/dvaJi/ReaderFront/compare/v3.4.2...v3.5.0) (2018-07-15)


### Bug Fixes

* **Home:** carousel button is not symmetrical ([#75](https://github.com/dvaJi/ReaderFront/issues/75)) ([412685c](https://github.com/dvaJi/ReaderFront/commit/412685c))
* **Reader:** chapters weren't sorted and caused that next and previous buttons doesn't work properly ([#74](https://github.com/dvaJi/ReaderFront/issues/74)) ([0b46091](https://github.com/dvaJi/ReaderFront/commit/0b46091))
* **Reader:** Reader did not update itself correctly when changing from one series to another ([#71](https://github.com/dvaJi/ReaderFront/issues/71)) ([97d02d6](https://github.com/dvaJi/ReaderFront/commit/97d02d6))


### Features

* **Home:** New module, it will display the latest releases, recently added series, a random series and a discord widget ([#69](https://github.com/dvaJi/ReaderFront/issues/69)) ([9488597](https://github.com/dvaJi/ReaderFront/commit/9488597))
* **Reader:** Lazy loading images ([#67](https://github.com/dvaJi/ReaderFront/issues/67)) ([360c93c](https://github.com/dvaJi/ReaderFront/commit/360c93c))



## [3.4.2](https://github.com/dvaJi/ReaderFront/compare/v3.4.1...v3.4.2) (2018-05-16)


### Bug Fixes

* **Header:** Toggle nav didn't work ([#64](https://github.com/dvaJi/ReaderFront/issues/64)) ([8db5b93](https://github.com/dvaJi/ReaderFront/commit/8db5b93))
* **Reader:** Disqus comments were not updated correctly ([#63](https://github.com/dvaJi/ReaderFront/issues/63)) ([9843294](https://github.com/dvaJi/ReaderFront/commit/9843294))



## [3.4.1](https://github.com/dvaJi/ReaderFront/compare/v3.4.0...v3.4.1) (2018-05-01)


### Bug Fixes

* **Reader:** Images do not fit correctly to the size of the container ([#62](https://github.com/dvaJi/ReaderFront/issues/62)) ([99ac18c](https://github.com/dvaJi/ReaderFront/commit/99ac18c))



# [3.4.0](https://github.com/dvaJi/ReaderFront/compare/v3.3.0...v3.4.0) (2018-04-30)


### Features

* Implement Redux ([#59](https://github.com/dvaJi/ReaderFront/issues/59)) ([393d3ff](https://github.com/dvaJi/ReaderFront/commit/393d3ff))



# [3.3.0](https://github.com/dvaJi/ReaderFront/compare/v3.2.0...v3.3.0) (2018-04-07)


### Bug Fixes

* **Reader:** Corrección que casuaba que los link directos en otro idioma no funcionaban ([#49](https://github.com/dvaJi/ReaderFront/issues/49)) ([3a5821b](https://github.com/dvaJi/ReaderFront/commit/3a5821b))
* **Releases:** Ahora muestra el nombre de la serie en vez del nombre del capítulo ([#47](https://github.com/dvaJi/ReaderFront/issues/47)) ([e7c6b7d](https://github.com/dvaJi/ReaderFront/commit/e7c6b7d))


### Features

* Integración de CD para la rama 'ravens' ([#46](https://github.com/dvaJi/ReaderFront/issues/46)) ([f747dce](https://github.com/dvaJi/ReaderFront/commit/f747dce))
* Links de Discord y Patreon ahora son configurables ([#55](https://github.com/dvaJi/ReaderFront/issues/55)) ([7f3c43e](https://github.com/dvaJi/ReaderFront/commit/7f3c43e))



# [3.2.0](https://github.com/dvaJi/ReaderFront/compare/v3.1.0...v3.2.0) (2018-03-27)


### Bug Fixes

* **Reader:** Corrección de estilos de imágenes ([f6202d3](https://github.com/dvaJi/ReaderFront/commit/f6202d3))
* **Series:** Se corrige error en los estilos que no permitía buscar series. ([#38](https://github.com/dvaJi/ReaderFront/issues/38)) ([17e6871](https://github.com/dvaJi/ReaderFront/commit/17e6871))


### Features

* Portada por defecto para las series ([#41](https://github.com/dvaJi/ReaderFront/issues/41)) ([6c93d7e](https://github.com/dvaJi/ReaderFront/commit/6c93d7e))



# [3.1.0](https://github.com/dvaJi/ReaderFront/compare/v3.0.1...v3.1.0) (2018-03-06)


### Bug Fixes

* **Blog:** Corrección de estilos del módulo Blog ([#31](https://github.com/dvaJi/ReaderFront/issues/31)) ([f2b9db6](https://github.com/dvaJi/ReaderFront/commit/f2b9db6))
* **Reader:** Se añade salto de línea para cada imágen ([#32](https://github.com/dvaJi/ReaderFront/issues/32)) ([cb5dc2a](https://github.com/dvaJi/ReaderFront/commit/cb5dc2a))


### Features

* Actualizar a Bootstrap 4 con la lib reactstrap ([#26](https://github.com/dvaJi/ReaderFront/issues/26)) ([51c932e](https://github.com/dvaJi/ReaderFront/commit/51c932e)), closes [#17](https://github.com/dvaJi/ReaderFront/issues/17)



## [3.0.1](https://github.com/dvaJi/ReaderFront/compare/v3.0.0...v3.0.1) (2018-02-15)


### Bug Fixes

* Nuevo link de Boostrap con la versión 3.3.7 ([#20](https://github.com/dvaJi/ReaderFront/issues/20)) ([27c9101](https://github.com/dvaJi/ReaderFront/commit/27c9101)), closes [#19](https://github.com/dvaJi/ReaderFront/issues/19)



# [3.0.0](https://github.com/dvaJi/ReaderFront/compare/2.1.2...v3.0.0) (2018-01-24)


### Features

* Cambiar framework a React 16 ([#13](https://github.com/dvaJi/ReaderFront/issues/13)) ([05bb5e5](https://github.com/dvaJi/ReaderFront/commit/05bb5e5)), closes [#12](https://github.com/dvaJi/ReaderFront/issues/12)


### BREAKING CHANGES

* `Ahora está hecho en React, por lo que cambiaron prácticamente todas las dependencias.



## [2.1.2](https://github.com/dvaJi/ReaderFront/compare/2.1.1...2.1.2) (2017-09-09)



## [2.1.1](https://github.com/dvaJi/ReaderFront/compare/2.1.0...2.1.1) (2017-08-15)



# [2.1.0](https://github.com/dvaJi/ReaderFront/compare/2.0.0...2.1.0) (2017-08-05)



# [2.0.0](https://github.com/dvaJi/ReaderFront/compare/1.1.0...2.0.0) (2017-07-08)



# [1.0.0](https://github.com/dvaJi/ReaderFront/compare/0.1.0...1.0.0) (2017-05-28)



# [0.1.0](https://github.com/dvaJi/ReaderFront/compare/0.0.7...0.1.0) (2017-05-21)



## 0.0.7 (2017-04-30)



