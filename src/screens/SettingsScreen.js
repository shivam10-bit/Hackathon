import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoSave: true,
    locationServices: false,
    analytics: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleBackup = () => {
    Alert.alert('Backup', 'Backing up your data...');
  };

  const handleExport = () => {
    Alert.alert('Export', 'Exporting your data...');
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully!'),
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* General Settings */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="notifications" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={() => toggleSetting('notifications')}
                trackColor={{ false: '#767577', true: '#00d4ff' }}
                thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="dark-mode" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={settings.darkMode}
                onValueChange={() => toggleSetting('darkMode')}
                trackColor={{ false: '#767577', true: '#00d4ff' }}
                thumbColor={settings.darkMode ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="save" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Auto Save</Text>
              </View>
              <Switch
                value={settings.autoSave}
                onValueChange={() => toggleSetting('autoSave')}
                trackColor={{ false: '#767577', true: '#00d4ff' }}
                thumbColor={settings.autoSave ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </Animatable.View>

        {/* Privacy Settings */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="location-on" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Location Services</Text>
              </View>
              <Switch
                value={settings.locationServices}
                onValueChange={() => toggleSetting('locationServices')}
                trackColor={{ false: '#767577', true: '#00d4ff' }}
                thumbColor={settings.locationServices ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="analytics" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Analytics & Tracking</Text>
              </View>
              <Switch
                value={settings.analytics}
                onValueChange={() => toggleSetting('analytics')}
                trackColor={{ false: '#767577', true: '#00d4ff' }}
                thumbColor={settings.analytics ? '#fff' : '#f4f3f4'}
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="security" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Change Password</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="fingerprint" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Biometric Login</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Data Management */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} onPress={handleBackup}>
              <View style={styles.settingLeft}>
                <Icon name="backup" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Backup Data</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleExport}>
              <View style={styles.settingLeft}>
                <Icon name="file-download" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Export Data</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleClearCache}>
              <View style={styles.settingLeft}>
                <Icon name="cleaning-services" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Clear Cache</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Support */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="help" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Help Center</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="contact-support" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Contact Support</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="bug-report" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Report a Bug</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="star" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Rate App</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* About */}
        <Animatable.View animation="fadeInUp" delay={700} style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="info" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>App Version</Text>
              </View>
              <Text style={styles.versionText}>1.0.0</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="description" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Terms of Service</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Icon name="privacy-tip" size={24} color="#00d4ff" />
                <Text style={styles.settingText}>Privacy Policy</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Danger Zone */}
        <Animatable.View animation="fadeInUp" delay={800} style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} onPress={handleDeleteAccount}>
              <View style={styles.settingLeft}>
                <Icon name="delete-forever" size={24} color="#ff6b6b" />
                <Text style={[styles.settingText, styles.dangerText]}>Delete Account</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  background: {
    flex: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  dangerText: {
    color: '#ff6b6b',
  },
  versionText: {
    color: '#b8b8b8',
    fontSize: 16,
  },
});

export default SettingsScreen;
