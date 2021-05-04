type LoginBody = {
  password: string;
  ssn: string;
};

type JWTPayload = {
  ssn: string;
};

export { LoginBody, JWTPayload };
