import CustomField from "@/types/CustomField";
import CustomFieldClass from "@/types/CustomFieldClass";

type CombinedCustomField = CustomFieldClass & CustomField;

const mergeArrays = (
  fieldClasses: CustomFieldClass[],
  fields: CustomField[]
) => {
  const result = fieldClasses.map((fieldClass) => {
    const matchingField = fields.find(
      (field) => field.name === fieldClass.name
    );

    if (matchingField) {
      return { ...fieldClass, value: matchingField.value };
    } else {
      return fieldClass;
    }
  });

  return result as CombinedCustomField[];
};

export default mergeArrays;
