/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function go<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[T, U | null]> {
  return promise
    .then<[T, null]>((data: T) => [data, null])
    .catch<[T, U]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [{} as T, parsedError];
      }

      return [{} as T, err];
    });
}

export default go;
