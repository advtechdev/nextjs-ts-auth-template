import { AccessibleFieldsDocument, AccessibleModel } from "@casl/mongoose"
import { getModelForClass as oldGetModelForClass } from "@typegoose/typegoose"
import {
  AnyParamConstructor,
  IModelOptions,
} from "@typegoose/typegoose/lib/types"

export type DocumentType<T> = AccessibleFieldsDocument & T

const getModelForClass = <T>(
  cl: AnyParamConstructor<unknown>,
  options?: IModelOptions
  // @ts-expect-error Types
): AccessibleModel<DocumentType<T>> => oldGetModelForClass(cl, options)

export default getModelForClass
