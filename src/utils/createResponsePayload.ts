type ApiFieldError = {
  message: string;
  source: string;
};

type CreateJSONPayloadSignature =
  | {
      errors?: ApiFieldError[];
      message?: string;
      payload?: unknown;
      status?: number;
    }
  | undefined;

export default ({
  errors = [],
  message = 'Ok',
  payload,
  status = 200,
}: CreateJSONPayloadSignature = {}) => {
  return {
    errors,
    message,
    payload,
    status,
  };
};

export type { ApiFieldError, CreateJSONPayloadSignature };
