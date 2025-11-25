import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { studentsResults } from "../../data/studentsResults";

const { height, width } = Dimensions.get("window");

export default function Results() {
  const [searchId, setSearchId] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = () => {
    const cleanedId = searchId.trim().toUpperCase();
    const found = studentsResults.find(
      (s) => s.id.toUpperCase() === cleanedId
    );
    setStudent(found || null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>🎓 Student Exam Results</Text>

        {/* Search Box */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter Student ID (e.g., BUBT003)"
            value={searchId}
            onChangeText={setSearchId}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>

        {student ? (
          <>
            {/* Student Header Card */}
            <View style={styles.profileCard}>
              <Text style={styles.profileName}>{student.name}</Text>
              <Text style={styles.profileId}>ID: {student.id}</Text>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>📘 Summary</Text>
              <Text style={styles.summaryText}>Overall GPA: {student.overallGPA}</Text>
              <Text style={styles.summaryText}>Best Subject: {student.bestSubject}</Text>
              <Text style={styles.summaryText}>
                Needs Improvement: {student.improvementSubject}
              </Text>
            </View>

            {/* Individual Results */}
            <Text style={styles.sectionTitle}>📚 Subject-wise Results</Text>
            {student.results.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.grade}>Grade: {item.grade}</Text>
                <Text style={styles.marks}>Marks: {item.marks}</Text>
              </View>
            ))}

            {/* Teacher Remarks */}
            <View style={styles.remarksCard}>
              <Text style={styles.remarksTitle}>📝 Teacher Remarks</Text>
              <Text style={styles.remarksText}>{student.teacherRemarks}</Text>
            </View>
          </>
        ) : (
          searchId.length > 0 && (
            <Text style={styles.notFound}>❌ No student found with ID "{searchId}"</Text>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    backgroundColor: "#FCEFFB",
    minHeight: height,
  },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E91E63",
    marginBottom: 20,
    textAlign: "center",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginRight: 10,
    elevation: 3,
  },
  searchBtn: {
    backgroundColor: "#E91E63",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  searchBtnText: {
    color: "white",
    fontWeight: "700",
  },
  profileCard: {
    backgroundColor: "#FFEBF0",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  profileName: { fontSize: 22, fontWeight: "700", color: "#C2185B" },
  profileId: { fontSize: 16, color: "#444" },

  summaryCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },
  summaryTitle: { fontSize: 18, fontWeight: "800", color: "#E91E63", marginBottom: 8 },
  summaryText: { fontSize: 15, fontWeight: "600", marginVertical: 2 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
    color: "#C2185B",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  subject: { fontSize: 18, fontWeight: "700", color: "#E91E63" },
  grade: { fontSize: 14, color: "#444" },
  marks: { fontSize: 14, color: "#444" },

  remarksCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
    elevation: 3,
  },
  remarksTitle: { fontSize: 18, fontWeight: "700", color: "#E91E63" },
  remarksText: { fontSize: 14, color: "#555", marginTop: 4 },

  notFound: {
    fontSize: 18,
    color: "#D81B60",
    textAlign: "center",
    marginTop: 20,
  },
});