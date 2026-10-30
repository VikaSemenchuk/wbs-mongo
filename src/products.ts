import { db } from "#db";
import type { Product } from "./types.ts";
import type { DeleteResult, FindCursor, ObjectId, UpdateResult, WithId } from "mongodb";

const products = db.collection<Product>("products");

products.createIndex({ name: "text", tags: "text" });

export const getProducts = async (): Promise<Product[]> => {
  return products.find().toArray();
};

export const getProductById = async (id: ObjectId): Promise<Product> => { 
    const product: WithId<Product> | null = await products.findOne({ _id: id })
    if (!product) { 
        throw new Error("No product with such id");
    }
    return product
}

export const searchProduct = async (text: string): Promise<WithId<Product>[]> => {
   const results = await products.find({ $text: { $search: text } }).toArray();
   if (results.length === 0) {
     throw new Error(`No products was finded with such ${text}`);
   }
   return results;
};

export const createProduct = async (product: Product): Promise<ObjectId> => { 
 const newProduct = await products.insertOne(product)
    return newProduct.insertedId
}

export const updateProduct = async (id: ObjectId, update: Product): Promise<UpdateResult<Product>> => { 
    return products.updateOne({ _id: id }, {$set: update})
}

export const deleteProduct = async (id: ObjectId): Promise<DeleteResult> => { 
    return products.deleteOne({_id: id})
}