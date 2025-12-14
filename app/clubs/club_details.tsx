import { useLocalSearchParams } from "expo-router";
import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { clubs } from "../../data/clubs";

export default function ClubDetails() {
  const { id } = useLocalSearchParams();
  const club = clubs.find((c) => c.id === id);

  if (!club) return <Text>Club not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={club.profileImage} style={styles.image} />
        <Text style={styles.name}>{club.name}</Text>
        <Text style={styles.desc}>{club.description}</Text>
      </View>

      {/* Future Work */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔮 Future Work</Text>
        <Text style={styles.sectionText}>{club.futureWork}</Text>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        {club.achievements.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Skills</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillBox}>
            <Text style={styles.skillTitle}>Technical Skills</Text>
            {club.technicalSkills.map((skill, idx) => (
              <Text key={idx} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}
          </View>
          <View style={styles.skillBox}>
            <Text style={styles.skillTitle}>Soft Skills</Text>
            {club.softSkills.map((skill, idx) => (
              <Text key={idx} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Social Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 Social Links</Text>
        <View style={styles.linksContainer}>
          <Pressable
            style={styles.linkButton}
            onPress={() => Linking.openURL(club.socialLinks.linkedin)}
          >
            <Text style={styles.linkText}>LinkedIn</Text>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => Linking.openURL(club.socialLinks.github)}
          >
            <Text style={styles.linkText}>GitHub</Text>
          </Pressable>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Contact</Text>
        <Text style={styles.sectionText}>Email: {club.contact.email}</Text>
        <Text style={styles.sectionText}>Phone: {club.contact.phone}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#FFF8F8" },
  header: { alignItems: "center", marginBottom: 20 },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#ff9a9e",
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 4,
    textAlign: "center",
  },
  desc: { fontSize: 15, color: "#555", textAlign: "center" },
  section: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 8,
  },
  sectionText: { fontSize: 14, color: "#555", lineHeight: 20 },
  listItem: { fontSize: 14, color: "#555", marginBottom: 4 },
  skillsContainer: { flexDirection: "row", justifyContent: "space-between" },
  skillBox: { width: "48%" },
  skillTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#ff7b9e",
  },
  skillItem: { fontSize: 14, color: "#555", marginBottom: 3 },
  linksContainer: { flexDirection: "row", gap: 12, marginTop: 8 },
  linkButton: {
    backgroundColor: "#ff9a9e",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  linkText: { color: "#fff", fontWeight: "700" },
});
