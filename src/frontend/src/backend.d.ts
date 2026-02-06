import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    imageUrl?: string;
    isVegetarian: boolean;
    price: bigint;
    isSpecial: boolean;
}
export type Time = bigint;
export interface MenuCategory {
    id: string;
    name: string;
    description: string;
}
export interface UserProfile {
    name: string;
    email?: string;
    phoneNumber?: string;
}
export interface Review {
    id: string;
    content: string;
    reviewerName: string;
    rating: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMenuCategory(category: MenuCategory): Promise<void>;
    addMenuItem(item: MenuItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createReservation(fullName: string, phoneNumber: string, date: Time, time: string, numberOfGuests: bigint, notes: string | null): Promise<void>;
    deleteMenuItem(itemId: string): Promise<void>;
    getAllMenuCategories(): Promise<Array<MenuCategory>>;
    getAllReviews(): Promise<Array<Review>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMenuCategory(categoryId: string): Promise<MenuCategory | null>;
    getMenuItemsByCategory(categoryId: string): Promise<Array<MenuItem>>;
    getSpecialMenuItems(): Promise<Array<MenuItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialData(): Promise<void>;
    updateMenuItem(item: MenuItem): Promise<void>;
}
