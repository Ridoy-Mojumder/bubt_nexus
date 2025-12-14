import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  importantLinks,
  recentNotices,
  upcomingNotices,
} from "../../data/notice";

import { BackHeader } from "@/src/components/BackHeader";

export default function NoticeScreen() {
  // PDF download + share
  const downloadPdf = async (url: string, fileName: string) => {
    try {
      if (!url) {
        Alert.alert("Error", "No file URL available.");
        return;
      }

      // Web: open in new tab
      if (Platform.OS === "web") {
        Linking.openURL(url).catch(() => {
          Alert.alert("Error", "Unable to open the PDF link.");
        });
        return;
      }

      // Native: legacy FileSystem + Sharing
      const safeName = fileName || "file.pdf";
      const fileUri = FileSystem.documentDirectory + safeName;

      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log("✅ Downloaded to:", uri);

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Downloaded", "File downloaded to app documents folder.");
      }
    } catch (error) {
      console.log("❌ PDF download error:", error);
      Alert.alert("Error", "Failed to download the PDF file.");
    }
  };

  // link press handler
  const handleLinkPress = (link: any) => {
    if (!link.url) {
      Alert.alert("Coming Soon", "This link is not active yet.");
      return;
    }

    if (link.type === "PDF") {
      downloadPdf(link.url, link.fileName || `${link.title}.pdf`);
    } else {
      Linking.openURL(link.url).catch(() => {
        Alert.alert("Error", "Unable to open the link.");
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <BackHeader title="" />

        <Text className="" style={styles.title}>
          University Notices 📰
        </Text>
        <Text style={styles.subtitle}>
          Stay updated with all important exams, events and academic updates.
        </Text>

        {/* Upcoming Notices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Upcoming Notices</Text>
          {upcomingNotices.map((item) => (
            <View key={item.id} style={styles.noticeCard}>
              <View style={styles.noticeHeader}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <View style={styles.tagChip}>
                  <Text style={styles.tagText}>{item.category}</Text>
                </View>
              </View>
              <Text style={styles.noticeDate}>{item.displayDate}</Text>
              <Text style={styles.noticeDescription}>
                {item.description}
              </Text>
              <Text style={styles.noticeMeta}>Posted by {item.postedBy}</Text>
            </View>
          ))}
        </View>

        {/* Recent Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Recent Updates</Text>
          {recentNotices.map((item) => (
            <View key={item.id} style={styles.noticeCard}>
              <View style={styles.noticeHeader}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <View
                  style={[styles.tagChip, { backgroundColor: "#ffe0e6" }]}
                >
                  <Text style={[styles.tagText, { color: "#ff4f6a" }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <Text style={styles.noticeDate}>{item.displayDate}</Text>
              <Text style={styles.noticeDescription}>
                {item.description}
              </Text>
              <Text style={styles.noticeMeta}>Posted by {item.postedBy}</Text>
            </View>
          ))}
        </View>

        {/* Important Links / Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 Important Links</Text>
          {importantLinks.map((link) => (
            <Pressable
              key={link.id}
              style={styles.linkCard}
              onPress={() => handleLinkPress(link)}
            >
              <View style={styles.linkRow}>
                <View style={styles.linkDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.linkText}>{link.title}</Text>
                  <Text style={styles.linkSubtitle}>{link.subtitle}</Text>
                  {link.type === "PDF" && (
                    <Text style={styles.linkHint}>
                      Tap to download / open PDF
                    </Text>
                  )}
                </View>
                <View style={styles.linkTypeBadge}>
                  <Text style={styles.linkTypeText}>{link.type}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Footer info */}
        <Text style={styles.footerNote}>
          This is a demo notice screen. In the real app, all notices will be
          loaded dynamically from the database or an API.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: "#FFF8F8",
  },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 6,
    textAlign: "center",
    textShadowColor: "rgba(255,154,158,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 12,
  },
  noticeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  noticeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#ff9a9e22",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ff9a9e",
  },
  noticeDate: {
    fontSize: 13,
    color: "#ff9a9e",
    marginTop: 2,
  },
  noticeDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    lineHeight: 18,
  },
  noticeMeta: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
  },
  linkCard: {
    backgroundColor: "#ff9a9e22",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  linkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff9a9e",
  },
  linkText: {
    color: "#ff4f6a",
    fontWeight: "600",
    fontSize: 15,
  },
  linkSubtitle: {
    fontSize: 12,
    color: "#777",
  },
  linkHint: {
    fontSize: 11,
    color: "#aa7a84",
    marginTop: 2,
  },
  linkTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff9a9e55",
  },
  linkTypeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ff9a9e",
  },
  footerNote: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
});
