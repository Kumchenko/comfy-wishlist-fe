export const getObjectAsync = <T extends {}>(
  obj: T,
  delay: number = 1000,
  error?: boolean
): Promise<T> => {
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      if (error) {
        reject(new Error('Error occured during fetching'));
      }
      resolve(obj);
    }, delay); // Simulating a delay
  });
};
