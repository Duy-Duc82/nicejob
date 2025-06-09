'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' : 'data-bs-target="#xs-controllers-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' :
                                            'id="xs-controllers-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' : 'data-bs-target="#xs-injectables-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' :
                                        'id="xs-injectables-links-module-AppModule-56be239ff098f1255acee5e39dbdb822c3468de2cb4de8ad4ab43e98872b61027fb4ac482aee25fe6d51dafd9105f885405c633ef851de2f34bde9cc400296c7"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' :
                                            'id="xs-controllers-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' :
                                        'id="xs-injectables-links-module-AuthModule-4bf5ecd5af1ca2d0ba5a7f1a0c1e2f8a9f9fded8dac0ce66a17a3d6ecf3d3f79634e1d03785f811cb0b26d71b4251de71d658eb901008c70537df06d8953c142"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' :
                                            'id="xs-controllers-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' :
                                        'id="xs-injectables-links-module-CompaniesModule-3f567a3bfe748fdcdf3b27862dae1a6c0ffc4c6ac70ae1488995d3b7c4a8b87b01e5532fb2247b8b862f5d580115933d77aa4a9a2b7944265b7037fd6d93498a"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' :
                                            'id="xs-controllers-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' :
                                        'id="xs-injectables-links-module-DatabasesModule-1c0b7ba9d97c7d06b5f0e440995b532a219e84339a7bedff86bfe9c3befa57557be45de60c06b4fb09a6ad5d9dd194973fd4161fee25e58275e05977760d8dda"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' :
                                            'id="xs-controllers-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' :
                                        'id="xs-injectables-links-module-FilesModule-9c616598c3e40fa12ad4bf7bffe3bb4e26755565b8d0e26644baa8fe5440c0f817c85d89638f0cafae39e71b056d5315b2052f0b542eb0bb9882f0c5facab6dd"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' :
                                            'id="xs-controllers-links-module-HealthModule-c62dd427256bdf624556c6bb9a01b24664a73dad0767bb71722e98d1242c9ba5045206b9c008bd48cfdd7d048d5d7913d7843290eed03d73bbdb80ef2fc3e739"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' :
                                            'id="xs-controllers-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' :
                                        'id="xs-injectables-links-module-JobsModule-52f3cc63d7e04b584eeba559b780f745098d9dfb401f2c8cbdace6ceba00cbcf7a79b88671d82af5edfa0769dcd4f1d260428223e2d065ed43aa6b2e3e0f3103"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' : 'data-bs-target="#xs-controllers-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' :
                                            'id="xs-controllers-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' : 'data-bs-target="#xs-injectables-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' :
                                        'id="xs-injectables-links-module-MailModule-d9658f094b3d28352078c76f2cb0908903b17596d13ec96f4815b122d9347e91d462b45bf33801f6a6990f413d979bdd3a7585bac59a1b02ff65d7c1b460b757"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' :
                                            'id="xs-controllers-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' :
                                        'id="xs-injectables-links-module-PermissionsModule-39ac54b5aed5fefb6495e7f1dab394edf458cfb09e5d650d7a180d0ef58d45eb5c821779070e539e0b1b3550288012ec2b5266badc9356c056f467e0482c5f80"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' :
                                            'id="xs-controllers-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' :
                                        'id="xs-injectables-links-module-ResumesModule-a63cc9922e93352dd8d080eb632c7d7328ecf2ce1c386ecf36a3ed56e84456679a60fd7d49aa586157b381075afe87cb4ee75290ccb61e7a21f7bf292c2ff837"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' : 'data-bs-target="#xs-controllers-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' :
                                            'id="xs-controllers-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' : 'data-bs-target="#xs-injectables-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' :
                                        'id="xs-injectables-links-module-RoleModule-6888db5816e32ba5946e73290603168c059f710bb40f22ee7a85677c9a0872bb716899fd952ce7bfa12237349822fd51a15fb669534c9094b93c5da31de73f74"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' :
                                            'id="xs-controllers-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' :
                                        'id="xs-injectables-links-module-SubscribersModule-e678280d3c847dac889c2514f27ae36305340df51c86064df27e280f15f9470661b069e225e11dc81018090669fa59cf5fa28154f52c2cbdecf49e3610eb4eb8"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' :
                                            'id="xs-controllers-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' :
                                        'id="xs-injectables-links-module-UsersModule-d1ae1e993147e0bf0bb4f42a2e537d83bc70945116ad3a92c8fdc2bdd6d0bef5f2eaa60547130a31e723782c6c1747c606d871bf0fe3d8555f24980a356fda79"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoleController.html" data-type="entity-link" >RoleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/company.html" data-type="entity-link" >company</a>
                            </li>
                            <li class="link">
                                <a href="classes/company-1.html" data-type="entity-link" >company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/History.html" data-type="entity-link" >History</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedBy.html" data-type="entity-link" >UpdatedBy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRef.html" data-type="entity-link" >UserRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRef-1.html" data-type="entity-link" >UserRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRef-2.html" data-type="entity-link" >UserRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRef-3.html" data-type="entity-link" >UserRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRef-4.html" data-type="entity-link" >UserRef</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Iuser.html" data-type="entity-link" >Iuser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});