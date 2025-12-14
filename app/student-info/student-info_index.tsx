import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CRProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Back to Home button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🎓 Class Representative</Text>

        {/* Profile Image + Name */}
        <View style={styles.profileSection}>
          <Image
            source={require("@/assets/images/all-images/user-profile.png")}
            style={styles.profileImage}
            contentFit="cover"
          />

          <Text style={styles.nameText}>Md. Rakib Hasan</Text>
          <Text style={styles.emailText}>rakib.hasan@bubt.edu.bd</Text>
          <Text style={styles.subText}>Intake 45 · Section 3 · CSE</Text>
        </View>

        {/* Short Info Card (role / id / intake / section) */}
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: "#ff9a9e22" }]}>
              <Text style={styles.badgeText}>CR</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#ffe0e6" }]}>
              <Text style={styles.badgeText}>Intake 45</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#ffe0e6" }]}>
              <Text style={styles.badgeText}>Section 3</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Department</Text>
              <Text style={styles.infoValue}>Computer Science &amp; Engineering</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+88017XXXXXXXX</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { marginTop: 12 }]}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>20234203142</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Campus</Text>
              <Text style={styles.infoValue}>Main Campus</Text>
            </View>
          </View>
        </View>

        {/* CR Details / Responsibilities */}
        <View style={styles.crCard}>
          <Text style={styles.crTitle}>👤 CR Details</Text>

          <View style={styles.crRow}>
            <View style={styles.crCol}>
              <Text style={styles.crLabel}>Full Name</Text>
              <Text style={styles.crValue}>Md. Rakib Hasan</Text>
            </View>
            <View style={styles.crCol}>
              <Text style={styles.crLabel}>Intake &amp; Section</Text>
              <Text style={styles.crValue}>45 | 3</Text>
            </View>
          </View>

          <View style={styles.crRow}>
            <View style={styles.crCol}>
              <Text style={styles.crLabel}>Email</Text>
              <Text style={styles.crValue}>rakib.hasan@bubt.edu.bd</Text>
            </View>
            <View style={styles.crCol}>
              <Text style={styles.crLabel}>Phone</Text>
              <Text style={styles.crValue}>+88017XXXXXXXX</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Responsibilities</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Collect and share class routine &amp; updates with students.
            </Text>
            <Text style={styles.bulletItem}>
              • Communicate important notices from teachers &amp; admin.
            </Text>
            <Text style={styles.bulletItem}>
              • Help maintain discipline and attendance in the classroom.
            </Text>
            <Text style={styles.bulletItem}>
              • Coordinate exam schedule changes and makeup classes.
            </Text>
          </View>
        </View>

        {/* Availability / Office Hour Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🕒 Availability</Text>

          <View style={{ marginTop: 8 }}>
            <Text style={styles.infoLabel}>On Campus</Text>
            <Text style={styles.infoValue}>Sun – Thu, 9:00 AM – 3:00 PM</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.infoLabel}>Best Time to Contact</Text>
            <Text style={styles.infoValue}>Between classes &amp; via WhatsApp</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.infoLabel}>Preferred Contact</Text>
            <Text style={styles.infoValue}>Class WhatsApp Group / Messenger</Text>
          </View>
        </View>

        {/* Important Links (demo only) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🔗 Important Links</Text>

          <View style={styles.linkRow}>
            <View style={styles.linkDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.linkTitle}>Class WhatsApp Group</Text>
              <Text style={styles.linkSub}>Only for Intake 51, Section A students</Text>
            </View>
          </View>

          <View style={styles.linkRow}>
            <View style={styles.linkDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.linkTitle}>CSE Notices (Dept.)</Text>
              <Text style={styles.linkSub}>Check latest academic &amp; exam notices here</Text>
            </View>
          </View>

          <View style={styles.linkRow}>
            <View style={styles.linkDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.linkTitle}>Class Routine (PDF)</Text>
              <Text style={styles.linkSub}>Updated: 20 November 2025</Text>
            </View>
          </View>
        </View>

        {/* Last Announcement (demo) */}
        <View style={styles.crCard}>
          <Text style={styles.sectionTitle}>📝 Last Announcement</Text>

          <Text style={styles.announcementTitle}>
            Quiz on Data Structures – Rescheduled
          </Text>
          <Text style={styles.announcementText}>
            The quiz of CSE 2303 (Data Structures) has been shifted to{" "}
            <Text style={{ fontWeight: "700" }}>Monday, 2 December 2025</Text> at{" "}
            <Text style={{ fontWeight: "700" }}>11:00 AM</Text>.{"\n"}
            {"\n"}
            Please bring your ID card and be present 10 minutes before the exam
            starts.
          </Text>

          <Text style={styles.announcementMeta}>
            Posted by CR · 28 November 2025 · 9:30 PM
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF8F8",
    alignItems: "center",
    paddingBottom: 40,
  },
  container: {
    width: "92%",
    alignItems: "center",
    paddingTop: 40,
  },

  // NEW styles for back button
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#ff9a9e33",
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ff4f6a",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 24,
    textShadowColor: "rgba(255, 154, 158, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#ff9a9e",
    marginBottom: 10,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 4,
  },
  emailText: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  subText: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff4f6a",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  // CR card styles
  crCard: {
    width: "100%",
    backgroundColor: "#fff7f8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ffe0e6",
  },
  crTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff4f6a",
    marginBottom: 12,
  },
  crRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 8,
  },
  crCol: {
    flex: 1,
  },
  crLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  crValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ffe0e6",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff4f6a",
    marginBottom: 6,
  },
  bulletList: {
    marginTop: 4,
    gap: 4,
  },
  bulletItem: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },

  // Links
  linkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    gap: 8,
  },
  linkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    backgroundColor: "#ff9a9e",
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  linkSub: {
    fontSize: 12,
    color: "#777",
  },

  // Announcement
  announcementTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  announcementText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    lineHeight: 19,
  },
  announcementMeta: {
    fontSize: 11,
    color: "#999",
    marginTop: 8,
  },

  footerNote: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
    textAlign: "center",
  },
});
