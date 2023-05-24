import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const ApplyBranch = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
  };

  const courses = [
    { name: "Fizik", color: "#9999CC" },
    { name: "Kimya", color: "#723CEC" },
    { name: "Matematik", color: "#4D60EC" },
    { name: "Biyoloji", color: "#1768AC" },
    { name: "Türkçe", color: "#00B8D4" },
    { name: "İngilizce", color: "#008080" },
  ];

  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.backgroundImage}>
      <View style={styles.card}>
        <Text style={styles.question}>Soru çözeceğiniz branşı seçiniz:</Text>
        <View style={styles.coursesContainer}>
          {courses.map((course, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.courseButton,
                selectedCourse === course.name && styles.selectedCourseButton,
                { borderColor: course.color },
              ]}
              onPress={() => handleCourseSelection(course.name)}
            >
              <View style={[styles.courseCircle, { backgroundColor: selectedCourse === course.name ? course.color : "transparent" }]} />
              <Text style={styles.courseText}>{course.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.centerView}>
            <TouchableOpacity 
            style={[styles.selectBranchButton, { opacity: selectedCourse ? 1 : 0.5 }]}
            disabled={!selectedCourse}
            >
            <Text style={styles.selectBranchText}>Branşı Seç</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    border:1,
    borderColor: "gray"
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  coursesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  courseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedCourseButton: {
    borderWidth: 0,
  },
  courseCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  centerView:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  courseText: {
    fontSize: 16,
  },
  selectBranchButton: {
    backgroundColor: "#9999CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 130,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  selectBranchText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ApplyBranch;
