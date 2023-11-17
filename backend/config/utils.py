from datetime import datetime


def is_unique_fields(fields):
    names_set = set()

    for field in fields:
        name = field.get("name")
        if name in names_set:
            return False
        names_set.add(name)

    return True


def is_type_comparable_with_value(value, type):
    if (type == 'integer'):
        try:
            int(value)
        except ValueError:
            return False
    if (type == 'text' or type == 'textarea'):
        try:
            str(value)
        except ValueError:
            return False
    if (type == 'checkbox'):
        if value not in ('true', 'false'):
            return False
    if (type == 'date'):
        try:
            datetime.strptime(value, '%Y-%m-%d')
        except ValueError:
            return False

    return True


def have_allowed_fields(field, allowed_field_keys):
    for key in field.keys():
        if key not in allowed_field_keys:
            return False
    for key in allowed_field_keys:
        if key not in field.keys():
            return False
    return True


def get_merged_fields(fields_classes, fields):
    merged_fields = []

    for fields_class in fields_classes:
        for field in fields:
            if fields_class["name"] == field["name"]:
                merged_field = fields_class.copy()
                merged_field.update(field)
                merged_fields.append(merged_field)

    return merged_fields


def is_synced_with_field_classes(fields_classes, fields):
    names_classes = {item["name"] for item in fields_classes}
    names_fields = {item["name"] for item in fields}
    print(names_classes)
    if len(fields) != len(names_classes):
        return False
    if not names_fields.issubset(names_classes):
        return False

    for field in get_merged_fields(fields_classes, fields):
        if not is_type_comparable_with_value(field["value"], field["type"]):
            return False

    return True



