export type FoodItem = {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    like: string[];
    description?: string;
};


export interface CartItem {
    $id: string;
    id: string;
    name: string;
    userId: string;
    quantity: number;
    imageUrl: string;
    price: number;
    addedAt?: string;
}