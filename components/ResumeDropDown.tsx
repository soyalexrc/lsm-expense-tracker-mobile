import * as DropdownMenu from "zeego/dropdown-menu";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";

type Props = {
    groups: Item[];
    onSelect: (value: 'on' | 'mixed' | 'off', keyItem: string) => void;
    selectedItem: string;
}

type Item = {
    key: string;
    items: Array<{
        key: string;
        title: string;
        icon: string;
        iconAndroid: string;
    }>
}

export default function ResumeDropDown({onSelect, groups, selectedItem}: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    function handleOnOpenChange(isOpen: boolean) {
        console.log(isOpen)
    }

    function getTitleByKeySelected(keySelected: string) {
        let result = '';
        for (let i = 0; i < groups.length; i++) {
            for (let j = 0; j < groups[i].items.length; j++) {
                let key = groups[i].items[j].key;
                if (key === keySelected) {
                    result = groups[i].items.find(element => element.key === key)?.title ?? '';
                }
            }
        }
        return result;
    }

    return (
        <View style={styles.container}>
            <DropdownMenu.Root onOpenChange={handleOnOpenChange}>
                <DropdownMenu.Trigger>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.fs18, isMenuOpen && styles.opacityMedium]}>{getTitleByKeySelected(selectedItem)}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.fs32, isMenuOpen && styles.opacityMedium]}>S/</Text>
                            <Text style={[styles.fw64, styles.fwBold, isMenuOpen && styles.opacityMedium]}>5,748</Text>
                            <Text style={[styles.fs32, styles.fwBold, isMenuOpen && styles.opacityMedium]}>.52</Text>
                        </View>
                    </View>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content loop={false} side='bottom' sideOffset={0} align='center' alignOffset={0} collisionPadding={0} avoidCollisions={true}>
                    {
                        groups.map(group => (
                            <DropdownMenu.Group key={group.key}>
                                {
                                    group.items.map(item => (
                                        <DropdownMenu.CheckboxItem key={item.key}
                                                                   value={selectedItem === item.key ? 'on' : 'off'}
                                                                   onValueChange={(value) => onSelect(value, item.key)}>
                                            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
                                            <DropdownMenu.ItemIndicator/>
                                        </DropdownMenu.CheckboxItem>
                                    ))
                                }
                            </DropdownMenu.Group>
                        ))
                    }
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fs32: {
        fontSize: 32
    },
    fwBold: {
        fontWeight: 'bold'
    },
    fs18: {
        fontSize: 18
    },
    fw64: {
        fontSize: 64
    },
    fw18: {
        fontSize: 18
    },
    opacityMedium: {
        opacity: 0.5
    }
})
