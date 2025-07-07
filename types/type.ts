export type FoodItem = {
    like: string[];
    price: number;
    id: string;
    name: string;
    image: string;
    description: string;
    halal: string;
    category: string;
    ingredients: string;
    nutrient: string;
    reviews: [{
        message: string,
        userName: string,
        userImage: string,
    }],
};


export interface CartItem {
    id: string;
    name?: string;
    userId?: string;
    quantity?: number;
    imageUrl?: string;
    price?: number;
    addedAt?: string;
}


export type Order = {
    id: string;
    address: {
        countryName: string;
        homeNumber: string;
        stateName: string;
        streetName: string;
        townName: string;
        zipcode: string;
    };
    items: {
        id: string;
        imageUrl: string;
        name: string;
        price: number;
        quantity: number;
        userId: string;
    }[];
    orderTime: {
        seconds: number;
        nanoseconds: number;
    };
    orderDate?: number
    paymentIntentId: {
        Canceled: string;
        Processing: string;
        RequiresAction: string;
        RequiresCapture: string;
        RequiresConfirmation: string;
        RequiresPaymentMethod: string;
        Succeeded: string;
        Unknown: string;
    };
    phone: string;
    status: "pending" | "completed" | "failed" | string;
    totalAmount: number;
    userId: string;
};

