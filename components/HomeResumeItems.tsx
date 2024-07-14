import {Image, StyleSheet, Text, View} from "react-native";

const data = [
    {
        id: 1,
        date: "Yesterday",  // Use specific dates for better tracking
        total: "125.78",
        items: [
            {
                id: "001",
                category: {
                    id: 1,
                    label: "Groceries",
                    icon: "cart"
                },
                value: "78.43"
            },
            {
                id: "002",
                category: {
                    id: 2,
                    label: "Dining",
                    icon: "cutlery"
                },
                value: "23.15"
            },
            {
                id: "003",
                category: {
                    id: 3,
                    label: "Transportation",
                    icon: "bus"
                },
                value: "24.20"
            }
        ]
    },
    {
        id: 2,
        date: "2024-07-12",
        total: "38.99",
        items: [
            {
                id: "004",
                category: {
                    id: 4,
                    label: "Utilities",
                    icon: "plug"
                },
                value: "38.99"
            }
        ]
    },
    {
        id: 3,
        date: "2024-07-11",
        total: "82.50",
        items: [
            {
                id: "005",
                category: {
                    id: 2,
                    label: "Dining",
                    icon: "cutlery"
                },
                value: "54.00"
            },
            {
                id: "006",
                category: {
                    id: 5,
                    label: "Shopping",
                    icon: "shopping-bag"
                },
                value: "28.50"
            }
        ]
    },
    // Add more expense entries here following the same format
    {
        id: 10,
        date: "2024-07-04",
        total: "15.00",
        items: [
            {
                id: "019",
                category: {
                    id: 6,
                    label: "Personal Care",
                    icon: "spa"
                },
                value: "15.00"
            }
        ]
    },
    // ... and so on for at least 10 entries
];


export default function HomeResumeItems() {
    return (
        <>
            {data.map(group => (
                <View key={group.id}>
                    <View style={styles.container}>
                        <View style={{ width: 30 }} />
                        <View style={[styles.imageWithLabel, {marginTop: 12}]}>
                            <Text style={{ color: 'gray', fontSize: 14 }}>{group.date}</Text>
                            <Text style={{ color: 'gray', fontSize: 14 }}>S/ {group.total}</Text>
                        </View>
                    </View>
                    {group.items.map((item) => (
                        <View style={styles.container} key={item.id}>
                            <Image source={require(`../assets/icons/popcorn.png`)} style={{ width: 30, height: 30 }} />
                            <View style={styles.imageWithLabel}>
                                <Text style={styles.label}>{item.category.label}</Text>
                                <Text>S/ {item.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            ))}
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    imageWithLabel: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingVertical: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
    }
})
