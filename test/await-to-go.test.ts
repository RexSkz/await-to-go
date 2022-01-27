import { go } from '../src/await-to-go'

describe('Await to test', async () => {
  it('should return a value when resolved', async () => {
    const testInput = 41;
    const promise = Promise.resolve(testInput);

    const [data, err] = await go<number>(promise);

    expect(data).toEqual(testInput);
    expect(err).toBeNull();
  });

  it('should return an error when promise is rejected', async () => {
    // const testInput = 41;
    const promise = Promise.reject('Error');

    const [data, err] = await go<number>(promise);

    // data can be any value, but err should be an error
    expect(err).toEqual('Error');
  });

  it('should add external properties to the error object', async () => {
    const promise = Promise.reject({ error: 'Error message' });

    const [, err] = await go<
      string,
      { error: string; extraKey: number }
    >(promise, {
      extraKey: 1
    });

    expect(err).toBeTruthy();
    expect((err as any).extraKey).toEqual(1);
    expect((err as any).error).toEqual('Error message')
  });

  it('should receive the type of the parent if no type was passed', async () => {
    let user: { name: string };
    let err: Error;

    [user, err] = await go(Promise.resolve({ name: '123' }));

    expect(user.name).toEqual('123');
  });
});
