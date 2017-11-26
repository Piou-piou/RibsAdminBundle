# RibsAdminBundle

## Introduction

RibsAdminBundle is a symfony Bundle that allow you to manager your website. With
this bundle you will be able to : 
- Create | edit | delete users
- Give access rights to users
- Create lists of access rights and put users in them
- Create | edit | delete page
- Manage pages contents with WYIWIG system
- Manage navigation
- Add module compatible with RibsAdminBundle

## Installation

WIP : this part can change in case of developpment requirments

Go in your Symfony project and install the bundle with composer.

```
composer require piou-piou/ribs-admin-bundle    
```

### Edit configuration of symfony

Edit the file app/config/config.yml, you have to delete nothing just add parameters under
correct parts wich are framework or twig.

```YML
framework:
    assets:
        json_manifest_path: '%kernel.project_dir%/web/build/manifest.json'
        
# Twig Configuration
twig:
    globals:
        ribsadmin_acces_right: "@ribs_admin.acess_rights"
        
# At the end of the file add this for FOSUSer
fos_user:
    db_driver: orm # other valid values are 'mongodb', 'couchdb' and 'propel'
    firewall_name: main
    user_class: Ribs\RibsAdminBundle\Entity\FosUser
    from_email:
        address: youadresse@mail.com
        sender_name: Ribs            
```

### Edit routing of symfony

Edit the file app/config/routing.yml, you have to delete nothing just add parameters at the end of the file.

```YML
ribs_admin:
    resource: "@RibsAdminBundle/Controller/"
    type: annotation
    prefix: /ribs-admin

fos_user:
    resource: "@FOSUserBundle/Resources/config/routing/all.xml"

fos_user_security_login:
    path:      /login
    defaults:  { _controller: RibsAdminBundle:Login:login, _method: POST }

fos_user_security_logout:
    path:      /logout
    defaults:  { _controller: RibsAdminBundle:Login:logout, _method: POST }
```

### Edit security of symfony

Edit the file app/config/security.yml, yo have to replace all the content by the following code : 

```YML
security:
    encoders:
        FOS\UserBundle\Model\UserInterface: bcrypt

    role_hierarchy:
        ROLE_ADMIN:       ROLE_USER
        ROLE_SUPER_ADMIN: ROLE_ADMIN

    providers:
        fos_userbundle:
            id: fos_user.user_provider.username

    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false

        main:
            pattern: ^/
            form_login:
                provider: fos_userbundle
                csrf_token_generator: security.csrf.token_manager # Use form.csrf_provider instead for Symfony <2.4
                login_path: /login
                check_path: /login_check
            logout:
                path: /logout
                target: /login
            anonymous:    true

    access_control:
        - { path: ^/login$, role: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/register, role: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/resetting, role: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/ribs-admin/, role: ROLE_USER }
```