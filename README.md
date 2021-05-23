# bibliobrain/backend
typescript backend for GTL library

## checklist of improvements for v1 release
- [] improve error handling from stored procedures

## setup
1. generate 2 pairs of cryptographic keys with following commands:
```bash
openssl genrsa -out ./security/accessTokenPrivate.pem 4096
openssl rsa -in ./security/accessTokenPrivate.pem -pubout -out ./security/accessTokenPublic.pem
openssl genrsa -out ./security/refreshTokenPrivate.pem 4096
openssl rsa -in ./security/refreshTokenPrivate.pem -pubout -out ./security/refreshTokenPublic.pem
```
2. create .configrc file in project's root directory and fill required fields (see .configrc.example).
