export type UserRole = 'farmer' | 'buyer' | 'agent' | 'exporter' | 'admin';

export type VisitorUserClass = 'farmer' | 'buyer' | 'agent' | 'exporter' | 'admin';

export interface VisitorRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: VisitorUserClass;
  visitDate: string;
  createdAt: string;
  device?: string;
}

export type VerificationLevel = 'unverified' | 'phone_verified' | 'identity_verified' | 'business_verified' | 'trade_verified' | 'trusted';

export type ProduceStatus = 'draft' | 'active' | 'sold' | 'expired';

export type OrderStatus = 'requested' | 'negotiating' | 'confirmed' | 'payment_pending' | 'paid' | 'processing' | 'dispatched' | 'delivered' | 'completed' | 'cancelled';

export type QualityGrade = 'A' | 'B' | 'C' | 'export';

export type CommodityCategory = 'plant' | 'animal';

export interface Commodity {
  id: string;
  name: string;
  category: CommodityCategory;
  unit: string;
}

export interface State {
  name: string;
  code: string;
  lgas: string[];
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  verificationLevel: VerificationLevel;
  avatar?: string;
  rating?: number;
  joinedDate: string;
}

export interface ProduceListing {
  id: string;
  sellerId: string;
  sellerRole: UserRole;
  commodityId: string;
  variety: string;
  quantity: number;
  price: number;
  currency: string;
  negotiable: boolean;
  grade: QualityGrade;
  location: string;
  state: string;
  availableDate: string;
  harvestDate: string;
  minOrder: number;
  packaging: string;
  storageCondition: string;
  status: ProduceStatus;
  createdAt: string;
  photos: string[];
  description?: string;
}

export interface Order {
  id: string;
  produceId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  price: number;
  deliveryLocation: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface PriceData {
  commodityId: string;
  state: string;
  price: number;
  change: number;
  changePercent: number;
  date: string;
}

export interface AgentAggregation {
  agentId: string;
  farmerId: string;
  produceId: string;
  quantity: number;
  grade: QualityGrade;
  date: string;
}

export type WantedStatus = "open" | "matched" | "closed";

export type DeliveryMethod = "pickup" | "delivery" | "courier" | "any";

export interface WantedRequest {
  id: string;
  requesterId: string;
  requesterRole: UserRole;
  commodityId: string;
  variety?: string;
  quantity: number;
  unit: string;
  budget?: number;
  budgetCurrency: string;
  negotiable: boolean;
  location: string;
  state: string;
  deliveryMethod: DeliveryMethod;
  notes: string;
  status: WantedStatus;
  createdAt: string;
  photos: string[];
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SellerProfile {
  id: string;
  role: UserRole;
  name: string;
  description: string;
  avatar?: string;
  verificationLevel: VerificationLevel;
  rating: number;
  state: string;
  lga: string;
  joinedDate: string;
  produceCount: number;
  tags: string[];
}
