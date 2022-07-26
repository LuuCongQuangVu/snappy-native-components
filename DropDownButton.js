import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Colors from './Colors';
import Modal from './Modal';

const color_bg = '#fff';
const color_text_active = Colors.daybreak_blue_7;
const color_bg_active = Colors.geek_blue_1;
const color_text = Colors.gray_5;
const color_divider = Colors.neutral_4;

export default class DropDownButton extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleSelect: false, keySelect: props.defaultKey || undefined };
  }

  showSelect = () => this.setState({ visibleSelect: true });
  hiddenSelect = () => this.setState({ visibleSelect: false });

  handleSelect = item => {
    const { onChange } = this.props;
    if (onChange) onChange(item);
    this.setState({ keySelect: item.key, visibleSelect: false });
  };

  render() {
    const { title, style, titleModal, options, showOption, customComponent, children, showKeySelect, textTitle, theme, placeholder } = this.props;
    const { visibleSelect, keySelect } = this.state;

    const nameOption = options?.find(item => item.key === keySelect)?.text;

    return (
      <View>
        {textTitle && (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: '500' }}>{textTitle}</Text>
          </View>
        )}

        <TouchableOpacity onPress={this.showSelect}>
          {children || (
            <View style={[styles.button, theme && styles[theme], style]}>
              <Text style={{ fontWeight: '500' }}>{(showOption && nameOption) || title || placeholder} </Text>
              <AntDesign name="down" size={12} color="black" />
            </View>
          )}
        </TouchableOpacity>
        <Modal visible={visibleSelect} titleModal={titleModal} onDismiss={this.hiddenSelect} useFast>
          <ScrollView>
            <View style={{ width: '100%', alignSelf: 'flex-start', paddingBottom: 24 }}>
              {(!customComponent &&
                options.map((item, idx) => {
                  const ComponentIcon = item?.icon?.component;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        item?.onPress && item?.onPress();
                        this.handleSelect(item);
                      }}
                      key={idx}
                      style={[
                        styles.container_item,
                        {
                          backgroundColor: keySelect === item.key ? color_bg_active : color_bg,
                        },
                      ]}>
                      <View style={styles.d_flex}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          {item?.icon && (
                            <ComponentIcon
                              {...item?.icon}
                              size={item?.icon?.size || 16}
                              color={keySelect === item.key ? color_text_active : '#595959'}
                              style={{ marginRight: 16 }}
                            />
                          )}
                          <Text
                            style={{
                              fontWeight: '500',
                              color: keySelect === item.key ? color_text_active : '#595959',
                            }}>
                            {item.text}
                          </Text>
                        </View>
                        {showKeySelect && keySelect === item.key && (
                          <Text>
                            <AntDesign name="check" size={12} color={color_text_active} />
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })) ||
                customComponent}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

DropDownButton.propTypes = {
  title: PropTypes.node,
  titleModal: PropTypes.string,
  style: PropTypes.object,
  styleContainerModal: PropTypes.object,
  styleContentModal: PropTypes.object,
  options: PropTypes.array,
  defaultKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showOption: PropTypes.bool,
  customComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  showKeySelect: PropTypes.bool,
  textTitle: PropTypes.string,
  theme: PropTypes.string,
  placeholder: PropTypes.string,
};

DropDownButton.defaultProps = {
  title: 'Snappy',
  titleModal: 'Snappy Express',
  style: {},
  styleContainerModal: {},
  styleContentModal: {},
  options: [
    { key: 1, text: 'Option 1' },
    { key: 2, text: 'Option 2' },
    { key: 3, text: 'Option 3' },
    { key: 4, text: 'Option 4' },
    { key: 5, text: 'Option 5' },
    { key: 6, text: 'Option 6' },
  ],
  defaultKey: 1,
  showOption: false,
  customComponent: undefined,
  showKeySelect: true,
};

const styles = StyleSheet.create({
  d_flex: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  container_item: { borderBottomWidth: 1, borderBottomColor: color_divider, paddingVertical: 12, paddingHorizontal: 24 },

  //theme:
  textTitle: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'space-between',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D9DBEA',
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 24,
  },
});
