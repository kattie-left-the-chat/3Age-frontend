
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import PatientsList from "@/components/PatientsList";
import { usePatientsContext } from "@/context/PatientsContext";
import { globalStyles } from "@/styles/global";

type FilterPriority = 1 | 2 | 3 | 4;
type SortField = "createdAt" | "priority";
type SortDirection = "asc" | "desc";

const priorityOptions: {
    label: string;
    value: FilterPriority;
}[] = [
    { label: "P1", value: 1 },
    { label: "P2", value: 2 },
    { label: "P3", value: 3 },
    { label: "P4", value: 4 },
];

export default function PatientsScreen() {
    const { patients, error, loading } = usePatientsContext();

    const [selectedPriorities, setSelectedPriorities] =
        useState<FilterPriority[]>([]);

    const [sortField, setSortField] =
        useState<SortField>("createdAt");

    const [sortDirection, setSortDirection] =
        useState<SortDirection>("asc");

    const allSelected = selectedPriorities.length === 0;

    function togglePriority(priority: FilterPriority) {
        setSelectedPriorities((current) => {
            if (current.includes(priority)) {
                return current.filter((p) => p !== priority);
            }

            return [...current, priority];
        });
    }

    function toggleSort(field: SortField) {
        if (sortField === field) {
            setSortDirection((current) =>
                current === "asc" ? "desc" : "asc"
            );
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    }

    const visiblePatients = useMemo(() => {
        const filtered = patients.filter((patient) => {
            if (selectedPriorities.length === 0) {
                return true;
            }

            return (
                patient.priority != null &&
                selectedPriorities.includes(
                    patient.priority as FilterPriority
                )
            );
        });

        return [...filtered].sort((a, b) => {
            if (sortField === "createdAt") {

                const result = a.createdAt.localeCompare(b.createdAt);

                return sortDirection === "asc"
                    ? -result
                    : result;
            }

            if (a.priority == null && b.priority == null) {
                return 0;
            }

            if (a.priority == null) {
                return 1;
            }

            if (b.priority == null) {
                return -1;
            }

            const result = a.priority - b.priority;

            return sortDirection === "asc"
                ? result
                : -result;
        });
    }, [
        patients,
        selectedPriorities,
        sortField,
        sortDirection,
    ]);

    const timeLabel =
        sortField === "createdAt"
            ? sortDirection === "asc"
                ? "Time ↑"
                : "Time ↓"
            : "Time";

    const priorityLabel =
        sortField === "priority"
            ? sortDirection === "asc"
                ? "Priority ↑"
                : "Priority ↓"
            : "Priority";

    return (
        <ScrollView
            style={globalStyles.container}
            contentContainerStyle={{ paddingBottom: 24 }}
        >
            <Text style={globalStyles.title}>Patients</Text>

            <View style={styles.sortRow}>
                <Pressable
                    onPress={() => toggleSort("createdAt")}
                    accessibilityRole="button"
                    accessibilityState={{
                        selected: sortField === "createdAt",
                    }}
                    style={[
                        styles.filterButton,
                        sortField === "createdAt" &&
                            styles.activeFilterButton,
                    ]}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            sortField === "createdAt" &&
                                styles.activeFilterButtonText,
                        ]}
                    >
                        {timeLabel}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => toggleSort("priority")}
                    accessibilityRole="button"
                    accessibilityState={{
                        selected: sortField === "priority",
                    }}
                    style={[
                        styles.filterButton,
                        sortField === "priority" &&
                            styles.activeFilterButton,
                    ]}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            sortField === "priority" &&
                                styles.activeFilterButtonText,
                        ]}
                    >
                        {priorityLabel}
                    </Text>
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.checkboxRow}
                contentContainerStyle={styles.checkboxRowContent}
            >
                <PriorityCheckbox
                    label="All"
                    checked={allSelected}
                    onPress={() => setSelectedPriorities([])}
                />

                {priorityOptions.map((option) => (
                    <PriorityCheckbox
                        key={option.value}
                        label={option.label}
                        checked={selectedPriorities.includes(
                            option.value
                        )}
                        onPress={() => togglePriority(option.value)}
                    />
                ))}
            </ScrollView>

            <PatientsList
                patients={visiblePatients}
                error={error}
                loading={loading}
            />
        </ScrollView>
    );
}

function PriorityCheckbox({
    label,
    checked,
    onPress,
}: {
    label: string;
    checked: boolean;
    onPress: () => void;
}) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            style={styles.checkboxOption}
        >
            <View
                style={[
                    styles.checkbox,
                    checked && styles.checkedCheckbox,
                ]}
            >
                {checked && (
                    <Text style={styles.checkmark}>✓</Text>
                )}
            </View>

            <Text style={styles.checkboxLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = {
    sortRow: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: 8,
        marginTop: 12,
        marginBottom: 4,
    },

    checkboxRow: {
        flexGrow: 0,
        marginBottom: 12,
    },

    checkboxRowContent: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: 12,
        paddingVertical: 4,
        paddingRight: 12,
    },

    filterButton: {
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },

    activeFilterButton: {
        backgroundColor: "#dbeafe",
        borderColor: "#2563eb",
    },

    filterButtonText: {
        color: "#333",
        fontSize: 13,
        fontWeight: "500" as const,
    },

    activeFilterButtonText: {
        color: "#1d4ed8",
    },

    checkboxOption: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: 5,
        paddingVertical: 8,
        paddingHorizontal: 2,
    },

    checkbox: {
        width: 19,
        height: 19,
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 4,
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },

    checkedCheckbox: {
        backgroundColor: "#2563eb",
        borderColor: "#2563eb",
    },

    checkmark: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold" as const,
    },

    checkboxLabel: {
        fontSize: 12,
        color: "#333",
    }
};
