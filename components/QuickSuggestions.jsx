import { View, Text, Pressable, StyleSheet } from "react-native";


const SUGGESTIONS = [
  "Create a beginner workout plan for 3 days a week",
  "What are good warm-up exercises before running?",
  "How can I stay consistent with workouts?",
  "Give me a fun way to stay active",
];

const QuickSuggestions = ({onSelect}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.helpText}>How can I help?</Text>
            {SUGGESTIONS.map((item,index)=> (
                <Pressable 
                key={index}
                style={styles.pill}
                onPress={()=> onSelect(item)}

                >
                    <Text style={styles.text}>{item}</Text>
                </Pressable>
            ))}

        </View>
    )
}


export default QuickSuggestions;


const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
    helpText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    },
  pill: {
    backgroundColor: "#E0E7FF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
  text: {
    color: "#1E3A8A",
    fontSize: 14,
  },
});