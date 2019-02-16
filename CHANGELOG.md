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



