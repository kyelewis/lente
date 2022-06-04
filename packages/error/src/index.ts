export const createErrorHtml = (base: string, ...errors: string[]): string => {

   const result = `<h2>Sorry, lente had some trouble with ${base}</h2>${errors
            .map((error) => `<p>${error}</p>`)
            .join()}`;
            return result;

  };

