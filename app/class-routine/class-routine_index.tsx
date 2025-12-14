// app/class-routine/class-routine_index.tsx
import { BackHeader } from "@/src/components/BackHeader";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const times = [
  "08:20 AM\n09:30 AM",
  "09:30 AM\n10:40 AM",
  "10:40 AM\n11:50 AM",
  "11:50 AM\n01:00 PM",
  "03:30 PM\n04:40 PM",
  "04:40 PM\n05:50 PM",
  "05:50 PM\n07:00 PM",
  "07:00 PM\n08:10 PM",
  "08:10 PM\n09:20 PM",
] as const;

const days = ["SAT", "SUN", "MON", "TUE", "WED", "THR", "FRI"] as const;
type Day = (typeof days)[number];

const routine: Record<Day, string[]> = {
  SAT: Array(times.length).fill(""),
  SUN: Array(times.length).fill(""),
  MON: [
    "",
    "",
    "",
    "",
    "",
    "",
    "CSE 321\nFC: SAM\nR: 2318",
    "CSE 301\nFC: AKHA\nR: 2518",
    "CSE 301\nFC: AKHA\nR: 2518",
  ],
  TUE: Array(times.length).fill(""),
  WED: [
    "",
    "",
    "",
    "",
    "",
    "CSE 321\nFC: SAM\nR: 2710",
    "CSE 322\nFC: SAM\nR: 2517",
    "CSE 322\nFC: SAM\nR: 2517",
    "",
  ],
  THR: Array(times.length).fill(""),
  FRI: [
    "CSE 320\nFC: SDH\nR: 2416",
    "CSE 320\nFC: SDH\nR: 2416",
    "CSE 319\nFC: SDH\nR: 2319",
    "CSE 319\nFC: SDH\nR: 2319",
    "CSE 341\nFC: JAM\nR: 2316",
    "CSE 341\nFC: JAM\nR: 2316",
    "CSE 342\nFC: JAM\nR: 2518",
    "CSE 342\nFC: JAM\nR: 2518",
    "",
  ],
};

const courses = [
  {
    code: "CSE 301",
    title: "Technical Writing and presentation",
    fc: "AKHA",
    name: "Mst. Aklima Khatun Akhi",
  },
  {
    code: "CSE 319",
    title: "Computer Networks",
    fc: "SDH",
    name: "Md. Saddam Hossain",
  },
  {
    code: "CSE 320",
    title: "Computer Networks Lab",
    fc: "SDH",
    name: "Md. Saddam Hossain",
  },
  {
    code: "CSE 321",
    title: "Artificial Intelligence and Expert System",
    fc: "SAM",
    name: "Shamim Ahmed",
  },
  {
    code: "CSE 322",
    title: "Artificial Intelligence and Expert System Lab",
    fc: "SAM",
    name: "Shamim Ahmed",
  },
  {
    code: "CSE 341",
    title: "Advanced Programming",
    fc: "JAM",
    name: "Jubayer Al Mahmud",
  },
  {
    code: "CSE 342",
    title: "Advanced Programming Lab",
    fc: "JAM",
    name: "Jubayer Al Mahmud",
  },
];

export default function ClassRoutineScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <BackHeader title="" />

      {/* Header card */}
      <View style={styles.headerCard}>
        <Text style={styles.title}>
          Bangladesh University of Business &amp; Technology (BUBT)
        </Text>
        <Text style={styles.subtitle}>
          Program: B.Sc. Engg in CSE • Intake: 45 - 3
        </Text>
        <Text style={styles.meta}>Semester: Fall 2025</Text>
        <Text style={styles.meta}>
          Room [4-digit number, the first digit represents the building]
        </Text>
        <Text style={styles.meta}>
          [Building-2: Martyr Sujan Mahmud Building] •{" "}
          [Building-3: Martyr Tahmid Abdullah Building]
        </Text>
      </View>

      {/* Routine table */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tableWrapper}
      >
        <View style={styles.tableCard}>
          {/* Header row */}
          <View style={[styles.row, styles.headerRow]}>
            <View style={[styles.cellDay, styles.headerCell]}>
              <Text style={styles.headerText}>Day / Time</Text>
            </View>
            {times.map((time) => (
              <View key={time} style={[styles.cellTime, styles.headerCell]}>
                <Text style={styles.headerText}>{time}</Text>
              </View>
            ))}
          </View>

          {/* Day rows */}
          {days.map((day) => (
            <View key={day} style={styles.row}>
              <View style={[styles.cellDay, styles.dayCell]}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
              {routine[day].map((entry, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.cellTime,
                    entry ? styles.cellFilled : styles.cellEmpty,
                  ]}
                >
                  {!!entry && <Text style={styles.cellText}>{entry}</Text>}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Course table card */}
      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>Course Details</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.courseTableWrapper}
        >
          <View style={{ minWidth: 520 }}>
            <View style={[styles.courseRow, styles.courseHeaderRow]}>
              <Text style={[styles.courseCellCode, styles.courseHeadText]}>
                Course Code
              </Text>
              <Text style={[styles.courseCellTitle, styles.courseHeadText]}>
                Course Title
              </Text>
              <Text style={[styles.courseCellFC, styles.courseHeadText]}>
                Faculty Code
              </Text>
              <Text style={[styles.courseCellName, styles.courseHeadText]}>
                Faculty Name
              </Text>
            </View>

            {courses.map((c) => (
              <View key={c.code} style={styles.courseRow}>
                <Text style={styles.courseCellCode}>{c.code}</Text>
                <Text style={styles.courseCellTitle}>{c.title}</Text>
                <Text style={styles.courseCellFC}>{c.fc}</Text>
                <Text style={styles.courseCellName}>{c.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff7f7",
  },
  pageContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    gap: 16,
  },
  headerCard: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: "#ffb3b8",
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },
  meta: {
    marginTop: 2,
    fontSize: 12,
    color: "#777",
  },
  tableWrapper: {
    paddingBottom: 8,
  },
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
  },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2d5da",
  },
  cellDay: {
    width: 70,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: "#f2d5da",
    justifyContent: "center",
    alignItems: "center",
  },
  cellTime: {
    minWidth: 110,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: "#f2d5da",
    borderBottomWidth: 1,
    borderBottomColor: "#f9e3e6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCell: {
    backgroundColor: "#ffecef",
  },
  headerText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#444",
    textAlign: "center",
  },
  dayCell: {
    backgroundColor: "#fff7f8",
    borderBottomWidth: 1,
    borderBottomColor: "#f2d5da",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff7a8a",
  },
  cellFilled: {
    backgroundColor: "#fff9fb",
  },
  cellEmpty: {
    backgroundColor: "#ffffff",
  },
  cellText: {
    fontSize: 11,
    color: "#333",
    textAlign: "center",
  },
  legendCard: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseTableWrapper: {
    paddingTop: 4,
  },
  courseRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 4,
  },
  courseHeaderRow: {
    backgroundColor: "#ffecef",
  },
  courseHeadText: {
    fontWeight: "700",
  },
  courseCellCode: {
    flex: 1.1,
    fontSize: 11,
    paddingHorizontal: 4,
    color: "#333",
  },
  courseCellTitle: {
    flex: 2.3,
    fontSize: 11,
    paddingHorizontal: 4,
    color: "#333",
  },
  courseCellFC: {
    flex: 1.2,
    fontSize: 11,
    paddingHorizontal: 4,
    color: "#333",
  },
  courseCellName: {
    flex: 2.4,
    fontSize: 11,
    paddingHorizontal: 4,
    color: "#333",
  },
});
