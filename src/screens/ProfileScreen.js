import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState({
    name: 'John Developer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    skills: ['React Native', 'Python', 'Machine Learning', 'UI/UX'],
    location: 'San Francisco, CA',
    bio: 'Passionate developer with 5+ years of experience in mobile and web development. Love building innovative solutions and contributing to open source projects.',
    projects: 12,
    teams: 5,
    hackathons: 8,
  });

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('Home'),
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
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Icon name="edit" size={24} color="#00d4ff" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.profileCard}>
          <LinearGradient
            colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 153, 204, 0.1)']}
            style={styles.profileGradient}
          >
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Icon name="person" size={60} color="#00d4ff" />
              </View>
            </View>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <Text style={styles.profileLocation}>{userProfile.location}</Text>
          </LinearGradient>
        </Animatable.View>

        {/* Stats */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.projects}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.teams}</Text>
            <Text style={styles.statLabel}>Teams</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.hackathons}</Text>
            <Text style={styles.statLabel}>Hackathons</Text>
          </View>
        </Animatable.View>

        {/* Bio Section */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.bioCard}>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>
        </Animatable.View>

        {/* Skills Section */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {userProfile.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* Contact Info */}
        <Animatable.View animation="fadeInUp" delay={700} style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Icon name="email" size={20} color="#00d4ff" />
              <Text style={styles.contactText}>{userProfile.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="phone" size={20} color="#00d4ff" />
              <Text style={styles.contactText}>{userProfile.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="location-on" size={20} color="#00d4ff" />
              <Text style={styles.contactText}>{userProfile.location}</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Settings */}
        <Animatable.View animation="fadeInUp" delay={800} style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <Icon name="notifications" size={24} color="#00d4ff" />
              <Text style={styles.settingText}>Notifications</Text>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Icon name="security" size={24} color="#00d4ff" />
              <Text style={styles.settingText}>Privacy & Security</Text>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Icon name="help" size={24} color="#00d4ff" />
              <Text style={styles.settingText}>Help & Support</Text>
              <Icon name="chevron-right" size={24} color="#b8b8b8" />
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Logout Button */}
        <Animatable.View animation="fadeInUp" delay={900} style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient
              colors={['#ff6b6b', '#ee5a52']}
              style={styles.logoutGradient}
            >
              <Icon name="logout" size={20} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#00d4ff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#b8b8b8',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: '#00d4ff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    width: (width - 80) / 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#b8b8b8',
    textAlign: 'center',
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
  bioCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  bioText: {
    color: '#b8b8b8',
    fontSize: 14,
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  skillText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '500',
  },
  contactCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
  logoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProfileScreen;
