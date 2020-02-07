class RequiredFieldsError extends Error {
  constructor(requiredFields: string[] , ...args) {
    super(...args);

    this.message = `Missing Required Fields: ${requiredFields}`;
    this.name = 'RequiredFieldsError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class UpdatePriceError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'Update Price Failed';
    this.name = 'UpdatePriceError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
class NoPriceFoundError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No Price Found';
    this.name = 'NoPriceFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class NoLocationFoundError extends Error {
  constructor(customMessage = 'No Location Found', ...args) {
    super(...args);

    this.message = customMessage;
    this.name = 'NoLocationFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class NoProduceFoundError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No Produce Found';
    this.name = 'NoProduceFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class NoUserFoundError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No User Found';
    this.name = 'NoUserFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class UserExistsError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'User Exists';
    this.name = 'UserExistsError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class NoValidRoleError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No Valid Role';
    this.name = 'NoValidRoleError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class NoTypeFoundError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No Type Found';
    this.name = 'NoTypeFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class NoTypesFoundError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No Types Found';
    this.name = 'NoTypesFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class TypeAlreadyDeletedError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'Type already deleted';
    this.name = 'TypeAlreadyDeleted';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class InvalidUpdateFieldsError extends Error {
  constructor(fields: string[], ...args) {
    super(...args);

    this.message = `Invalid update fields ${fields}`;
    this.name = 'InvalidUpdateFields';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

export {
  InvalidUpdateFieldsError,
  NoUserFoundError,
  UserExistsError,
  NoLocationFoundError,
  NoPriceFoundError,
  NoProduceFoundError,
  NoValidRoleError,
  NoTypeFoundError,
  NoTypesFoundError,
  RequiredFieldsError,
  TypeAlreadyDeletedError,
  UpdatePriceError,
 };
