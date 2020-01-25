class NoTypeFoundError extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'No Type Found';
    this.name = 'NoTypeFoundError';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

class TypeAlreadyDeleted extends Error {
  constructor(...args) {
    super(...args);

    this.message = 'Type already deleted';
    this.name = 'TypeAlreadyDeleted';
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}

export {
  NoTypeFoundError,
  TypeAlreadyDeleted,
 };
