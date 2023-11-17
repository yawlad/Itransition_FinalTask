from rest_framework.permissions import IsAuthenticated


class IsAuthenticatedAndNotBlocked(IsAuthenticated):

    def has_permission(self, request, view):
        base_permission = super().has_permission(request, view)
        return base_permission and not request.user.is_blocked


class IsSuperUser(IsAuthenticatedAndNotBlocked):

    def has_permission(self, request, view):
        base_permission = super().has_permission(request, view)
        return base_permission and request.user.is_superuser


class IsSuperUserOrOwner(IsAuthenticatedAndNotBlocked):

    def has_object_permission(self, request, view, obj):
        base_permission = super().has_permission(request, view)
        return base_permission and (request.user.is_superuser or obj.creator == request.user)
