declare module 'yup' {
    interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut>  {
        samePassword(password: string, message: string): StringSchema;
    }
  }
  