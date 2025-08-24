import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(26, 26, 46, 0.8)', 'rgba(26, 26, 46, 0.9)']}
          style={styles.overlay}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>Hackathon25</Text>
            <Text style={styles.tagline}>Innovate • Create • Inspire</Text>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.heroSection}>
              <Icon name="code" size={80} color="#00d4ff" style={styles.heroIcon} />
              <Text style={styles.heroTitle}>Welcome to the Future</Text>
              <Text style={styles.heroSubtitle}>
                Join thousands of developers in the most exciting hackathon of 2025
              </Text>
            </View>

            {/* Feature Cards */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureRow}>
                <TouchableOpacity style={styles.featureCard}>
                  <Icon name="rocket-launch" size={40} color="#00d4ff" />
                  <Text style={styles.featureTitle}>Quick Start</Text>
                  <Text style={styles.featureDesc}>Get started in minutes</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.featureCard}>
                  <Icon name="group" size={40} color="#ff6b6b" />
                  <Text style={styles.featureTitle}>Team Up</Text>
                  <Text style={styles.featureDesc}>Find your perfect team</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.featureRow}>
                <TouchableOpacity style={styles.featureCard}>
                  <Icon name="trending-up" size={40} color="#4ecdc4" />
                  <Text style={styles.featureTitle}>Track Progress</Text>
                  <Text style={styles.featureDesc}>Monitor your journey</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.featureCard}>
                  <Icon name="emoji-events" size={40} color="#ffd93d" />
                  <Text style={styles.featureTitle}>Win Prizes</Text>
                  <Text style={styles.featureDesc}>Amazing rewards await</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <LinearGradient
                  colors={['#00d4ff', '#0099cc']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Get Started</Text>
                  <Icon name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1000+</Text>
                <Text style={styles.statLabel}>Participants</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>$100K</Text>
                <Text style={styles.statLabel}>Prize Pool</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  backgroundImage: {
    width: width,
    minHeight: height,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#00d4ff',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroIcon: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#b8b8b8',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#b8b8b8',
    textAlign: 'center',
  },
  actionContainer: {
    marginBottom: 40,
  },
  primaryButton: {
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#00d4ff',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
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
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default HomeScreen;
