import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import * as ContextMenu from 'zeego/context-menu'
import {useRouter} from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
                isScheduled: true,
                value: "78.43"
            },
            {
                id: "002",
                category: {
                    id: 2,
                    label: "Dining",
                    icon: "cutlery"
                },
                isScheduled: false,
                value: "23.15"
            },
            {
                id: "003",
                category: {
                    id: 3,
                    label: "Transportation",
                    icon: "bus"
                },
                isScheduled: false,
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
                isScheduled: false,
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
                isScheduled: false,
                value: "54.00"
            },
            {
                id: "006",
                category: {
                    id: 5,
                    label: "Shopping",
                    icon: "shopping-bag"
                },
                isScheduled: false,
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
                isScheduled: false,
                value: "15.00"
            }
        ]
    },
    // ... and so on for at least 10 entries
];


export default function HomeResumeItems() {
    const router = useRouter();

    function handlePress(id: string) {
        console.log('here', id)
        router.push('/(tabs)/(home)/transactions/sample')
    }

    return (
        <>
            {data.map(group => (
                <View key={group.id}>
                    <View style={styles.container}>
                        <View style={{width: 20}}/>
                        <View style={[styles.imageWithLabel, {margin: 12}]}>
                            <Text style={{color: 'gray', fontSize: 14}}>{group.date}</Text>
                            <Text style={{color: 'gray', fontSize: 14}}>S/ {group.total}</Text>
                        </View>
                    </View>
                    {group.items.map((item) => (
                        <ContextMenu.Root key={item.id}>
                            <ContextMenu.Trigger>
                                <Pressable style={[styles.container, { backgroundColor: 'white' }]} onPress={() => handlePress(item.id)}>
                                    <Image source={require(`../assets/icons/popcorn.png`)}
                                           style={{width: 30, height: 30}}/>
                                    <View style={styles.imageWithLabel}>
                                       <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                           {
                                               item.isScheduled &&
                                               <FontAwesome6 name="arrow-rotate-left" size={16} color="gray" />
                                           }
                                           <Text style={styles.label}>{item.category.label}</Text>
                                       </View>
                                        <Text>S/ {item.value}</Text>
                                    </View>
                                </Pressable>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content loop={false} alignOffset={0} collisionPadding={0}
                                                 avoidCollisions={true}>
                                {
                                    item.isScheduled &&
                                    <ContextMenu.Item key='recurring'>
                                        <ContextMenu.ItemTitle>Stop Recurring</ContextMenu.ItemTitle>
                                        <ContextMenu.ItemIcon
                                            ios={{
                                                name: 'xmark'
                                            }}
                                        />
                                    </ContextMenu.Item>
                                }
                                <ContextMenu.Item key='duplicate'>
                                    <ContextMenu.ItemTitle>Duplicate</ContextMenu.ItemTitle>
                                    <ContextMenu.ItemIcon
                                        ios={{
                                            name: 'doc.on.doc'
                                        }}
                                    />
                                </ContextMenu.Item>
                                <ContextMenu.Item key='delete' destructive>
                                    <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                                    <ContextMenu.ItemIcon
                                        ios={{
                                            name: 'trash'
                                        }}
                                    />
                                </ContextMenu.Item>
                            </ContextMenu.Content>
                        </ContextMenu.Root>
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
