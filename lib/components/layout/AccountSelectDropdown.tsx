import * as DropdownMenu from "zeego/dropdown-menu";
import {Text, View, StyleSheet} from "react-native";
import { Entypo } from '@expo/vector-icons';
import {useAppSelector} from "@/lib/store/hooks";
import {selectAccounts} from "@/lib/store/features/accounts/accountsSlice";

export default function AccountSelectDropdown() {
    const accounts = useAppSelector(selectAccounts);

    function selectAccount() {

    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Text style={{ fontSize: 16 }}>All accounts</Text>
                    <Entypo name="select-arrows" size={18} color="black" />
                </View>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content loop={false} side='bottom' sideOffset={0} align='center' alignOffset={0} collisionPadding={0} avoidCollisions={true}>
                <DropdownMenu.Group>
                    <DropdownMenu.CheckboxItem key='0' value='on'>
                        <DropdownMenu.ItemTitle>All accounts</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIndicator />
                    </DropdownMenu.CheckboxItem>
                </DropdownMenu.Group>
                <DropdownMenu.Group>
                    {
                        accounts?.map((account) => (
                            <DropdownMenu.CheckboxItem key={String(account.id)} value='off'>
                                <DropdownMenu.ItemTitle>{account.title}</DropdownMenu.ItemTitle>
                                <DropdownMenu.ItemIndicator />
                            </DropdownMenu.CheckboxItem>
                        ))
                    }
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

    )
}
