# bibliobrain/backend
typescript backend for GTL library

## setup
1. generate pair of cryptographic keys with following commands:
```bash
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f ./security/jwtRS256.key
ssh-keygen -e -m PEM -f jwtRS256.key > ./security/jwtRS256.key.pub
```
2. create .configrc file in project's root directory and fill required fields (see .configrc.example).