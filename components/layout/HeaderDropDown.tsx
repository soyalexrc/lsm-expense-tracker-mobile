import * as DropdownMenu from "zeego/dropdown-menu";
import {Text, View} from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function HeaderDropDownMenu() {
    return (
        <DropdownMenu.Root >
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
                    <DropdownMenu.CheckboxItem key='1' value='off'>
                        <DropdownMenu.ItemTitle>Cash</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIndicator />
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem key='2' value='off'>
                        <DropdownMenu.ItemTitle>Visa  ****2293</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIndicator />
                    </DropdownMenu.CheckboxItem>
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

    )
}
