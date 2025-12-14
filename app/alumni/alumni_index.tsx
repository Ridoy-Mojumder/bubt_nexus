import { BackHeader } from "@/src/components/BackHeader";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { alumniData } from "../../data/alumniData";

export default function Alumni({ navigation }: { navigation: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  const sectors = ["All", "Tech", "Marketing", "Management", "Engineering"];

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSector =
      selectedSector === "All" || alumni.sector === selectedSector;
    const matchesSearch = alumni.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <BackHeader title="" />

        <Text style={styles.title}>👥 Alumni Network</Text>

        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Sector Filter */}
        <View style={styles.sectorContainer}>
          {sectors.map((sector, i) => (
            <Pressable
              key={i}
              style={[
                styles.sectorButton,
                selectedSector === sector && styles.sectorButtonActive,
              ]}
              onPress={() => setSelectedSector(sector)}
            >
              <Text
                style={
                  selectedSector === sector
                    ? styles.sectorTextActive
                    : styles.sectorText
                }
              >
                {sector}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Alumni Cards */}
        {filteredAlumni.map((alumni) => (
          <Pressable
            key={alumni.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("AlumniProfile", { alumniId: alumni.id })
            }
          >
            <Image source={{ uri: alumni.photo }} style={styles.photo} />
            <Text style={styles.name}>{alumni.name}</Text>
            <Text style={styles.details}>
              {alumni.dept} - Batch {alumni.year}
            </Text>
            <Text style={styles.details}>
              🏢 {alumni.position} @ {alumni.company}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 30, backgroundColor: "#FFF8F8" },
  container: { width: "90%", alignSelf: "center" },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ff9a9e",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ff9a9e",
  },
  sectorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
    gap: 10,
  },
  sectorButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff9a9e",
  },
  sectorButtonActive: { backgroundColor: "#ff9a9e" },
  sectorText: { color: "#ff9a9e", fontSize: 12 },
  sectorTextActive: { color: "#fff", fontSize: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#ff9a9e",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  photo: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ff9a9e",
    marginBottom: 4,
  },
  details: { fontSize: 14, color: "#555", marginVertical: 2 },
});
