export interface BookingDTO {
    current_day: string
    available_days: string[]
    restaurant: Restaurant
    tables: TableDTO[]
}

export interface Restaurant {
    id: number
    timezone: string
    restaurant_name: string
    opening_time: string
    closing_time: string
}

export interface TableDTO {
    id: string
    number: string
    zone: '1 Этаж' | '2 Этаж' | 'Банкетный зал'
    capacity: number
    orders: Order[]
    reservations: ReservationDTO[]
}

export interface Order {
    id: string
    status: OrderStatus
    start_time: string
    end_time: string
}

export type OrderStatus = 'New' | 'Closed' | 'Bill' | 'Banquet'

export interface ReservationDTO {
    id: number
    name_for_reservation: string
    phone_number: string
    num_people: number
    status: ReservationStatus
    seating_time: string
    end_time: string
}

export type ReservationStatus = 'Живая очередь' | 'Новая' | 'Заявка' | 'Открыт' | 'Отменен'

export type Reservation = Omit<ReservationDTO, 'seating_time'> & {
    start_time: string
}

export type Table = Omit<TableDTO, 'reservations'> & {
    reservations: Reservation[]
}

export type BookingTransformedDTO = Omit<BookingDTO, 'tables'> & {
    tables: Table[]
}
